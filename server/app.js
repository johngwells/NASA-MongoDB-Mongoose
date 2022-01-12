const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const planetsRouter = require('./routes/planets/planets');
const launchesRouter = require('./routes/planets/launches');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

app.use(morgan('combined'))

app.use(express.json());
app.use(planetsRouter);
app.use('/launches', launchesRouter);

module.exports = app;
