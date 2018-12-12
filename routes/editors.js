const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Editor = require('../models/editors');

router.post('/addEditor', (req, res, next) => {

  console.log('in route to add editor');

  let newEditor = new Editor({
    name: req.body.name,
    docEditor: req.body.docEditor,
    docCoordinator: req.body.docCoordinator,
    docProofReader: req.body.docProofReader,
    docSE: req.body.docSE
  });

  console.log(newEditor);

  Editor.getEditorByName(newEditor.name, (err, name) => {
    if(err) throw err;
    if(name) {
      return res.json({success: false, msg: 'This editor already exists.'});
    }

    Editor.addEditor(newEditor, (err, editor) => {
      if(err) {
        res.json({success: false, msg: 'Failed to add editor.'});
      } 
      else {
      res.json({success: true, msg: 'Editor added.'});
      }
    });
  });
});

router.get('/getEditors', (req, res, next) => {
  Editor.find({}, null, {sort: {name: 1}}, (err, editor) => {
    if (err) throw err;
    else {
      res.json(editor);
    }
  });
});

router.delete('/deleteEditor', (req, res, next) => {
  Editor.findByIdAndRemove(req.query.editorID, (err, doc) => { 
    if(err) {
      res.json({success: false, msg: 'Failed to delete editor.'});
      throw err;
    }
    else {
      res.json({success: true, msg: 'Editor deleted.'});
    }
  });
});

router.put('/updateEditor', (req, res, next) => {

  Editor.getEditorByNameUpdate(req.body.name, req.body.editorID, (err, name) => {
    if(err) throw err;
    if(name) {
      return res.json({success: false, msg: 'This editor already exists.'});
    }

    Editor.update({'_id' : req.body.editorID}, req.body, (err) => {
      if(err) {
        res.json({success: false, msg: 'Failed to update editor.'});
        throw err;
      }
      else {
        res.json({success: true, msg: 'Editor updated.'});
      }
    });
  });
});

module.exports = router;