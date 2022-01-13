const express = require('express');

const planetsRouter = require('./planets/planets');
const launchesRouter = require('./planets/launches');

const api = express.Router();

api.use(planetsRouter);
api.use('/launches', launchesRouter);

module.exports = api;