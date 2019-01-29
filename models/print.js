const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Print Issue Schema
const PrintSchema = mongoose.Schema({
  dateEntered: {
    type: Date, default: Date.now
  },
  printIssue: {
	  type: String
	},
  date: {
    type: Date
  }
});

const Print = module.exports = mongoose.model('Print', PrintSchema)

module.exports.getPrintByNameUpdate = function(printIssue, id, callback) {
  const query = {
    _id: { $ne: id },
    printIssue: printIssue 
  }
  Print.findOne(query, callback);
}

module.exports.getPrintByName = function(printIssue, callback) {
  console.log("In getPrintByName");
  const query = {printIssue: printIssue}
  Print.findOne(query, callback);
}

module.exports.addPrint = function(newPrint, callback) {
  newPrint.save(callback);
}