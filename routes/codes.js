const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Code = require('../models/codes');

router.post('/addCode', (req, res, next) => {

  console.log('in route to add code');
  console.log(req);

  let newCode = new Code({
    description: req.body.description,
    code: req.body.code,
    focus: req.body.focus
  });

  console.log(newCode);

  Code.getCodeByName(newCode.code, (err, code) => {
    if(err) throw err;
    if(code) {
      return res.json({success: false, msg: 'This code already exists.'});
  }

    Code.addCode(newCode, (err, code) => {
      if(err) {
        res.json({success: false, msg: 'Failed to add code.'});
      } 
      else {
      res.json({success: true, msg: 'Code added.'});
      }
    });
  });
});

router.get('/getCodes', (req, res, next) => {
  Code.find({}, null, {sort: {description: 1}}, (err, code) => {
    if (err) throw err;
    else {
      res.json(code);
    }
  });
});

router.delete('/deleteCode', (req, res, next) => {
  Code.findByIdAndRemove(req.query.codeID, (err, doc) => { 
    if(err) {
      res.json({success: false, msg: 'Failed to delete code.'});
      throw err;
    }
    else {
      res.json({success: true, msg: 'Code deleted.'});
    }
  });
});

router.put('/updateCode', (req, res, next) => {

  Code.getCodeByNameUpdate(req.body.code, req.body.codeID, (err, code) => {
    if(err) throw err;
    if(code) {
      return res.json({success: false, msg: 'This code already exists.'});
  }

    Code.update({'_id' : req.body.codeID}, req.body, (err) => {
      if(err) {
        res.json({success: false, msg: 'Failed to update code.'});
        throw err;
      }
      else {
        res.json({success: true, msg: 'Code updated.'});
      }
    });
  });
});

module.exports = router;