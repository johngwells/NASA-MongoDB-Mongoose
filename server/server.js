const http = require('http');
const app = require('./app');

const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets');
const { loadLaunchData } = require('./models/launch')

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => console.log(`server listening on ${PORT}...`));
}

startServer();
