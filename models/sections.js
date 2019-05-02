const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const SectionSchema = mongoose.Schema({
  dateEntered: {
    type: Date, default: Date.now
  },
  section: {
	  type: String,
	  required: true
	},
  department: {
    type: String
  },
  onlinePosition: {
    type: Number
  },
  printPosition: {
    type: Number
  },
  layout: {
    type: Boolean
  }

});

const Section = module.exports = mongoose.model('Section', SectionSchema)

module.exports.getSectionByNameUpdate = function(section, id, callback) {
  const query = {
    _id: { $ne: id},
    section: section
  }
  Section.findOne(query, callback);
}

module.exports.getSectionByName = function(section, callback) {
  const query = {
    section: section
  }
  Section.findOne(query, callback);
}

module.exports.addSection = function(newSection, callback) {
  newSection.save(callback);
}
