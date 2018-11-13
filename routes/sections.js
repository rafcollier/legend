const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Section = require('../models/sections');

router.post('/addSection', (req, res, next) => {

  let newSection = new Section({
    section: req.body.section,
    department: req.body.department,
    onlinePosition: req.body.onlinePosition,
    printPosition: req.body.printPosition
  });

  Section.getSectionByName(newSection.section, (err, section) => {
    //if(err) throw err;
    //if(section) {
    //  return res.json({success: false, msg: 'Section already added'});
    //}

    Section.addSection(newSection, (err, section) => {
      if(err) {
        res.json({success: false, msg: 'Failed to add section'});
      } 
      else {
      res.json({success: true, msg: 'Section added'});
      }
    });
  });
});

router.get('/getSections', (req, res, next) => {
  Section.find({}, null, {sort: {section: 1}}, (err, sections) => {
    if (err) throw err;
    else {
      res.json(sections);
    }
  });
});

router.delete('/deleteSection', (req, res, next) => {
  Section.findByIdAndRemove(req.query.docID, (err, doc) => { 
    if (err) throw err;
  });
});

module.exports = router;