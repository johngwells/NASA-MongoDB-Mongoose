const launchesDB = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

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

async function existsLaunchWithId(launchId) {
  return await launchesDB.findOne({
    flightNumber: launchId
  });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDB
    .findOne({})
    .sort('-flightNumber')

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launchesDB.find({}, {
    '_id': 0, '__v': 0
  });
}

async function saveLaunch(launch) {
  try {
    const planet = await planets.findOne({
      keplerName: launch.target
    });
  
    if (!planet) {
      throw new Error('No matching planet found');
    }
  
    await launchesDB.findOneAndUpdate({
      flightNumber: launch.flightNumber
    }, launch, {
      upsert: true
    });
  } catch(err) {
    console.log(err); 
  }
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = await getLatestFlightNumber() + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ['NASA'],
    flightNumber: newFlightNumber
  });

  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
  const aborted = await launchesDB.updateOne({
    flightNumber: launchId
  }, {
    upcoming: false,
    success: false
  });

  return aborted.modifiedCount === 1 && aborted.matchedCount === 1;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById
};
