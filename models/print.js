const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Print Issue Schema
const PrintSchema = mongoose.Schema({
  dateEntered: {
    type: Date, default: Date.now
  },
  printIssue: {
	type: String,
	required: true
	}
});

const Print = module.exports = mongoose.model('Print', PrintSchema)

module.exports.getPrintByName = function(printIssue, callback) {
  console.log("In getPrintByName");
  const query = {printIssue: printIssue}
  Print.findOne(query, callback);
}

module.exports.addPrintIssue = function(newPrint, callback) {
  newPrint.save(callback);
}