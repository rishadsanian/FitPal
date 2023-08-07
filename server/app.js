/* eslint-disable camelcase */
require("dotenv").config();
const { ENVIROMENT, PORT } = process.env;

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const pool = require("./configs/db.config");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//routes import
const logRoute = require("./routes/logRoute.js");
const profileRoute = require("./routes/profileRoute");
const progamsRoutes = require("./routes/programsRoutes");
const sessionsRoutes = require("./routes/sessionsRoutes");
const setsRoutes = require("./routes/setsRoute");
const profileRouteAPI = require("./routes/profileRoute_api");
const chartWorkoutAPI = require("./routes/chartWorkoutRoute_api");
const logHistoryCurrentDayAPI = require("./routes/logHistoryCurrentDay_api");
const logUpdateRoute = require("./routes/logUpdateRoute");
const logDeleteRoute = require("./routes/logDeleteRoute");

const app = express();
// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/log", logRoute);
app.use("/profile", profileRoute);
app.use("/programs", progamsRoutes);
app.use("/sessions", sessionsRoutes);
app.use("/sets", setsRoutes);
app.use("/api/profile", profileRouteAPI);
app.use("/api/chartworkout", chartWorkoutAPI);
app.use("/api/history", logHistoryCurrentDayAPI);
app.use("/update/log", logUpdateRoute);
app.use("/delete/log", logDeleteRoute);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
