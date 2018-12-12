const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const CodeSchema = mongoose.Schema({
  dateEntered: {
    type: Date, default: Date.now
  },
  description: {
	  type: String
	},
  code: {
    type: Number
  }
});

const Code = module.exports = mongoose.model('Code', CodeSchema)

module.exports.getCodeByNameUpdate = function(code, id, callback) {
  const query = {
    _id: { $ne: id },
    code: code
  }
  console.log(query);
  Code.findOne(query, callback);
}

module.exports.getCodeByName = function(code, callback) {
  const query = {
    code: code
  }
  console.log(query);
  Code.findOne(query, callback);
}

module.exports.addCode = function(newCode, callback) {
  newCode.save(callback);
}