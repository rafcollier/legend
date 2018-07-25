const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const OnlineSchema = mongoose.Schema({
  dateEntered: {
    type: Date, default: Date.now
  },
  date: {
	  type: String,
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

module.exports.getOnlineByName = function(online, callback) {
  const query = {online: online}
  Online.findOne(query, callback);
}

module.exports.addOnline = function(newOnline, callback) {
  newOnline.save(callback);
}