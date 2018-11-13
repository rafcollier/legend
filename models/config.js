const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const configDatabase = require('../config/database');

//User Schema
const ConfigSchema = mongoose.Schema({
  dateEntered: {
    type: Date, default: Date.now
  },
  firstNewsDOI: {
    type: Number, default: 0
  }

});

const Config = module.exports = mongoose.model('Config', ConfigSchema)

module.exports.addConfig = function(newConfig, callback) {
  console.log("in model with" + newConfig);
  newConfig.save(callback);
}