require("dotenv").config();

const express = require("express");
const cors = require("./middlewares/cors.middleware");

require("./configs/db.config");

const app = express();

app.use(express.json());
app.use(cors);

app.use("/api/v1", require("./configs/routes.config"));
app.use("/", require('./web'))

const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`Application running at port ${port}`));
