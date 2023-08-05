/* eslint-disable camelcase */
// declarations
require("dotenv").config();
const { ENVIROMENT, PORT } = process.env;
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

//routes import

const progamsRoutes = require("./routes/programsRoutes");
const logRoute = require("./routes/logRoute.js");
const profileRoute = require("./routes/profileRoute");
const profileRouteAPI = require("./routes/profileRoute_api");

const app = express();

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());

//////////////////////////ROUTES////////////////////////////////////////
//-----------------------------------------------------------------//

app.use("/api/programs", progamsRoutes);
app.use("/log", logRoute);
app.use("/profile",  profileRoute);
app.use("/api/profile", profileRouteAPI);


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
