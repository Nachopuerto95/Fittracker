require('dotenv').config();
require('../configs/db.config');
const Food = require('../models/food.model');
const CalendarEntry = require('../models/calendarEntry.model');
const dayjs = require("dayjs");
const Workout = require('../models/workout.model');
const mongoose = require('mongoose');

async function getExercises(workId) {
  try {
    const workout = await Workout.findById(workId);
    return workout.exercises;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
}

async function getAllFoods() {
  try {
    return await Food.find();
  } catch (error) {
    console.error('Error fetching foods:', error);
    throw error;
  }
}

async function entryExistsForDate(dateStr) {
  try {
    const entry = await CalendarEntry.findOne({ date: dateStr });
    return entry !== null;
  } catch (error) {
    console.error('Error checking if entry exists:', error);
    return false;
  }
}

async function createCalendarEntry(data, index) {
  try {
    // Verificar si ya existe una entrada para esta fecha
    const exists = await entryExistsForDate(data.date);
    if (exists) {
      console.log(`Entry for ${data.date} already exists, skipping`);
      return false;
    }
    
    await CalendarEntry.create(data);
    console.log(`Entry created ${index}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function getDayOfWeek(year, month, day) {
  const date = new Date(year, month - 1, day);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek[date.getDay()];
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getRandomFoods(foods) {
  const numberOfFoods = Math.floor(Math.random() * 2) + 3; // Random number between 3 and 4
  const randomFoods = [];
  for (let i = 0; i < numberOfFoods; i++) {
    const randomIndex = Math.floor(Math.random() * foods.length);
    const food = { ...foods[randomIndex]._doc, qty: Math.floor(Math.random() * 71) + 150 }; // Random qty between 150 and 220
    randomFoods.push(food);
  }
  return randomFoods;
}

function varyWeight(initialWeight, targetWeight, totalDays, daysPassed) {
  const increment = (targetWeight - initialWeight) / totalDays; // Calculate daily increment to reach the target
  const dailyVariation = Math.random() * 1 - 0.5; // Small daily variation between -0.5 and 0.5
  return initialWeight + (daysPassed * increment) + dailyVariation;
}

async function createEntriesForMonth(year, month, totalDays, exercises, foods, initialWeights, totalDaysPassed) {
  let entriesCreated = 0;
  
  for (let i = 1; i <= totalDays; i++) {
    const finishedEx = [];

    const dayOfWeek = getDayOfWeek(year, month, i);
    const dayAbbreviation = dayOfWeek.slice(0, 3).toLowerCase();
    const monthName = monthNames[month - 1];
    const dateStr = `${dayOfWeek}, ${i}, ${monthName}, ${year}`;

    // Verificar si ya existe una entrada para esta fecha
    const exists = await entryExistsForDate(dateStr);
    if (exists) {
      console.log(`Entry for ${dateStr} already exists, skipping`);
      continue;
    }

    // Filtra los ejercicios correspondientes al día de la semana
    const exercisesForDay = exercises.filter(exercise => exercise.day === dayAbbreviation);

    if (exercisesForDay.length > 0) {
      exercisesForDay.forEach(exercise => {
        const exerciseId = exercise._id.toString();

        // Inicializar el peso del ejercicio si no está registrado
        if (!initialWeights[exerciseId]) {
          initialWeights[exerciseId] = {
            weight: Math.random() * 10 + 8, // Initial weight between 8 and 18kg
            target: Math.random() * 30 + 20 // Target weight between 20 and 50kg
          };
        }

        // Variar el peso con un incremento base y una variación adicional
        const newWeight = varyWeight(initialWeights[exerciseId].weight, initialWeights[exerciseId].target, 92, totalDaysPassed + i); // 92 days to span across 3 months
        initialWeights[exerciseId].weight = newWeight; // Actualizar el peso inicial para el siguiente día

        // Crear las series con el mismo peso
        const work = Array.from({ length: 4 }, () => ({ reps: 8, kg: Math.round(newWeight) }));
        finishedEx.push({ exercise, work });
      });

      // Crear 3 sets de comidas aleatorias
      const meals = Array.from({ length: 3 }, () => ({ food: getRandomFoods(foods) }));

      const data = {
        finishedEx: finishedEx,
        date: dateStr,
        owner: "663a78c0547ed82f87502add",
        meals: meals
      };

      const created = await createCalendarEntry(data, i);
      if (created) {
        entriesCreated++;
      }
    }
  }
  
  console.log(`Created ${entriesCreated} new entries for ${monthNames[month - 1]} ${year}`);
  return totalDaysPassed + totalDays; // Actualizar el contador de días totales pasados
}

async function createEntries(workId, closeConnection = true) {
  try {
    const exercises = await getExercises(workId);
    const foods = await getAllFoods();
    const initialWeights = {};
    let totalDaysPassed = 0;

    // Obtener la fecha actual
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // getMonth() devuelve 0-11
    const currentDay = today.getDate();
    
    // Crear entradas para el mes anterior completo
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    const daysInPreviousMonth = new Date(previousMonthYear, previousMonth, 0).getDate();
    
    console.log(`Generating entries for ${monthNames[previousMonth - 1]} ${previousMonthYear}`);
    totalDaysPassed = await createEntriesForMonth(
      previousMonthYear, 
      previousMonth, 
      daysInPreviousMonth, 
      exercises, 
      foods, 
      initialWeights, 
      totalDaysPassed
    );
    
    // Crear entradas para el mes actual hasta el día de hoy
    console.log(`Generating entries for ${monthNames[currentMonth - 1]} ${currentYear} until day ${currentDay}`);
    totalDaysPassed = await createEntriesForMonth(
      currentYear, 
      currentMonth, 
      currentDay, // Solo hasta el día actual
      exercises, 
      foods, 
      initialWeights, 
      totalDaysPassed
    );
    
    return true;
  } catch (error) {
    console.error('Error creating entries:', error);
    return false;
  } finally {
    if (closeConnection) {
      mongoose.connection.close();
      console.log('Database connection closed');
    }
  }
}

// Exportar la función para que pueda ser llamada desde el controlador de login
module.exports = {
  createEntries
};

// Si el script se ejecuta directamente y no como módulo
if (require.main === module) {
  createEntries('66487de9e538db030ee1e6ad');
}