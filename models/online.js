const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const OnlineSchema = mongoose.Schema({
  dateEntered: {
    type: Date, default: Date.now
  },
  date: {
	  type: Date,
	  required: true
	},
  volume: {
    type: String,
    required: true
  },
  issue: {
    type: String,
    required: true
  }
});

const Online = module.exports = mongoose.model('Online', OnlineSchema)

module.exports.getOnlineByNameUpdate = function(date, id, callback) {
  const query = {
    _id: { $ne: id },
    date: date
  }
  Online.findOne(query, callback);
}

module.exports.getOnlineByName = function(date, callback) {
  const query = {
    date: date
  }
  Online.findOne(query, callback);
}

module.exports.addOnline = function(newOnline, callback) {
  newOnline.save(callback);
}