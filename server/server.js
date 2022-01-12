require('dotenv').config();
const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');


const { loadPlanetsData } = require('./models/planets');

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

const MONGO_URL = `mongodb+srv://johnwells:${process.env.DB_PASS}@nasa.hvhpj.mongodb.net/nasa?retryWrites=true&w=majority`

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!')
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => console.log(`server listening on ${PORT}...`));
}

startServer();
