const launchesDB = require('./launches.mongo');

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Explorer',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 21, 3030'),
  target: 'Kepler-442 b',
  customers: ['Me', 'NASA'],
  upcoming: true,
  success: true
};

saveLaunch(launch);

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

async function getAllLaunches() {
  return await launchesDB.find({}, {
    '_id': 0, '__v': 0
  });
}

async function saveLaunch(launch) {
  await launchesDB.updateOne({
    flightNumber: launch.flightNumber
  }, launch, {
    upsert: true
  });
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber, 
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ['NASA'],
      flightNumber: latestFlightNumber
  }));
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById
};
