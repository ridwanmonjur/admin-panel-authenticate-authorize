const { connect } = require('mongoose');
const dotenv = require("dotenv");
const { winstonLogger } = require('./winston/logger');
dotenv.config({ path: __dirname + "/config.env" });  // THIS IS UBUNTU. WINDOWS USER : dotenv.config({ path: __dirname+ "\env\\config.env" })

let connectionString = process.env['DB_CONNECTION'];

function connectDB() {
  connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
    .then(() => {
      winstonLogger.info("Connected to Database");
    })
    .catch(() => {
      winstonLogger.error("Failed to connect to Database");
    });

}
module.exports = { connectDB };