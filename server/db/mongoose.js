const config = require('../config');
const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose
    .connect(config.db.host)
    .then(() => {
      console.log('DB Connected!');
    })
    .catch((err) => {
      console.err(err);
    });
};

module.exports = connectDB;
