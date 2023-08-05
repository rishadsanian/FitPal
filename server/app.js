// declarations
require('dotenv').config();
const { ENVIROMENT, PORT } = process.env;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//routes import
const catsRoutes = require('./routes/catsRoutes');
const progamsRoutes = require('./routes/programsRoutes');

const app = express();

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());

app.use('/cats', catsRoutes);
app.use('/api/programs', progamsRoutes);

app.get('/', (req, res) => {
  res.json({ greetings: 'hello world' });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
