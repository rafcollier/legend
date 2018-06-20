const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Print = require('../models/print');

router.post('/addPrintIssue', (req, res, next) => {

  console.log(req.body.printIssue);

  console.log("in route print " + req.body);

  let newPrint = new Print({
    printIssue: req.body.printIssue
  });

  console.log(newPrint);

  Print.getPrintByName(newPrint.printIssue, (err, printIssue) => {
    if(err) throw err;
    if(printIssue) {
      return res.json({success: false, msg: 'Print issue already added'});
    }

    Print.addPrintIssue(newPrint, (err, section) => {
      if(err) {
        res.json({success: false, msg: 'Failed to add print issue'});
      } 
      else {
      res.json({success: true, msg: 'Print issue added'});
      }
    });
  });
});

router.get('/getPrintIssues', (req, res, next) => {
  Print.find({}, null, {sort: {dateEntered: -1}}, (err, printIssues) => {
    if (err) throw err;
    else {
      res.json(printIssues);
    }
  });
});

router.delete('/deletePrintIssue', (req, res, next) => {
  Print.findByIdAndRemove(req.query.docID, (err, doc) => { 
    if (err) throw err;
  });
});

module.exports = router;