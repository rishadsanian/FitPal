/* eslint-disable camelcase */
require('dotenv').config();
const { ENVIROMENT, PORT } = process.env;

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const pool = require('./configs/db.config');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//routes import
const progamsRoutes = require('./routes/programsRoutes');
const sessionsRoutes = require('./routes/sessionsRoutes');
const exercisesRoutes = require('./routes/exercisesRoutes');
const logRoute = require("./routes/logRoute.js");
const profileRoute = require("./routes/profileRoute");
const profileRouteAPI = require("./routes/profileRoute_api");

const app = express();
// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


app.use('/programs', progamsRoutes);
app.use('/sessions', sessionsRoutes);
app.use('/exercises', exercisesRoutes);
app.use("/log", logRoute);
app.use("/profile",  profileRoute);
app.use("/api/profile", profileRouteAPI);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
