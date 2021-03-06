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
    printPosition: req.body.printPosition,
    ETOCPosition: req.body.ETOCPosition,
    layout: req.body.layout,
    ETOCOnly: req.body.ETOCOnly
  });

  console.log(newSection);

  Section.getSectionByName(newSection.section, (err, section) => {
    if(err) throw err;
    if(section) {
      return res.json({success: false, msg: 'This section already exists.'});
    }

    Section.addSection(newSection, (err, section) => {
      if(err) {
        res.json({success: false, msg: 'Failed to add section.'});
      } 
      else {
      res.json({success: true, msg: 'Section added.'});
      }
    });
  });
});

router.get('/getSections', (req, res, next) => {

  let sortField = req.query.sortBy;
  let sortBy = {sort: sortField};
  let query1 = {}

  if(sortField == 'department')
    query1 = {'department' : {$exists : true, $nin: [ null, "", undefined ]}};
  else if(sortField == 'onlinePosition')
    query1 = {'onlinePosition' : {$exists : true, $nin: [ null, "", undefined ]}};
  else if(sortField == 'printPosition')
    query1 = {'printPosition' : {$exists : true, $nin: [ null, "", undefined ]}};
  else if(sortField == 'ETOCPosition')
    query1 = {'ETOCPosition' : {$exists : true, $nin: [ null, "", undefined ]}};
  else if(sortField == 'layout')
    query1 = {'layout' : {$exists : true, $nin: [ null, "", undefined ]}};
  else if(sortField == 'ETOCOnly')
    query1 = {'ETOCOnly' : {$exists : true, $nin: [ null, "", undefined ]}};
  else
    query1 = {'section' : {$exists : true, $nin: [ null, "", undefined ]}};


  Section.find(query1, null, sortBy, (err, sections) => {
    if (err) throw err;
    else {
      res.json(sections);
    }
  });
});

router.delete('/deleteSection', (req, res, next) => {
  Section.findByIdAndRemove(req.query.docID, (err, doc) => { 
    if (err) {
      res.json({success: false, msg: 'Failed to delete section.'});
      throw err;
    }
    else {
     res.json({success: true, msg: 'Section deleted.'}); 
    }
  });
});

router.put('/updateSection', (req, res, next) => {
  Section.getSectionByNameUpdate(req.body.section, req.body.sectionID, (err, section) => {
    if(err) throw err;
    if(section) {
      return res.json({success: false, msg: 'This section already exists.'});
  }

    Section.update({'_id' : req.body.sectionID}, req.body, (err) => {
      if(err) throw err;
      res.json({success: true, msg: 'Section updated.'});
    });
  });
});

module.exports = router;