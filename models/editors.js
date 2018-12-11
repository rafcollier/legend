const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const EditorSchema = mongoose.Schema({
  dateEntered: {
    type: Date, default: Date.now
  },
  name: {
	  type: String,
	  required: true
	},
  docEditor: {
    type: Boolean
  },
  docCoordinator: {
    type: Boolean
  },
  docProofReader: {
    type: Boolean
  },
  docSE: {
    type: Boolean
  }
});

const Editor = module.exports = mongoose.model('Editor', EditorSchema)

module.exports.getEditorByName = function(name, callback) {
  const query = {name: name}
  Editor.findOne(query, callback);
}

module.exports.addEditor = function(newEditor, callback) {
  newEditor.save(callback);
}