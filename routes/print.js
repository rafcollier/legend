const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Print = require('../models/print');

router.post('/addPrint', (req, res, next) => {

  console.log('in route to add print issue');

  let newPrint = new Print({
    printIssue: req.body.printIssue,
    date: req.body.date
  });

  console.log(newPrint);

  Print.getPrintByName(newPrint.printIssue, (err, print) => {
    if(err) throw err;
    if(print) {
      return res.json({success: false, msg: 'Print issue already exists for this date.'});
    }

    Print.addPrint(newPrint, (err, print) => {
      if(err) {
        res.json({success: false, msg: 'Failed to add print issue.'});
      } 
      else {
      res.json({success: true, msg: 'Print issue added.'});
      }
    });
  });
});

router.get('/getPrint', (req, res, next) => {
  Print.find({}, null, {sort: {printIssue: -1}}, (err, print) => {
    if (err) throw err;
    else {
      res.json(print);
    }
  });
});

router.delete('/deletePrint', (req, res, next) => {
  Print.findByIdAndRemove(req.query.printID, (err, doc) => { 
    if(err) {
      res.json({success: false, msg: 'Failed to delete print issue.'});
      throw err;
    }
    else {
      res.json({success: true, msg: 'Print issue deleted.'});
    }
  });
});

router.put('/updatePrint', (req, res, next) => {

  Print.getPrintByNameUpdate(req.body.date, req.body.printID, (err, online) => {
    if(err) throw err;
    if(print) {
      return res.json({success: false, msg: 'Print issue already exists for this date.'});
    }

    Print.update({'_id' : req.body.printID}, req.body, (err) => {
      if(err) {
        res.json({success: false, msg: 'Failed to update print issue.'});
        throw err;
      }
      else {
        res.json({success: true, msg: 'Print issue updated.'});
      }

    });
  });
});

module.exports = router;