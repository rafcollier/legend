const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Online = require('../models/online');

router.post('/addOnline', (req, res, next) => {

  console.log('in route to add online issue');

  let newOnline = new Online({
    date: req.body.date,
    volume: req.body.volume,
    issue: req.body.issue,
    firstPage: req.body.firstPage,
    lastPage: req.body.lastPage
  });

  Online.getOnlineByName(newOnline.date, (err, online) => {
    if(err) throw err;
    if(online) {
      return res.json({success: false, msg: 'Online issue already added'});
    }

    Online.addOnline(newOnline, (err, online) => {
      if(err) {
        res.json({success: false, msg: 'Failed to add online issue'});
      } 
      else {
      res.json({success: true, msg: 'Online issue added'});
      }
    });
  });
});

router.get('/getOnline', (req, res, next) => {
  Online.find({}, null, {sort: {volume: -1, issue: -1}}, (err, online) => {
    if (err) throw err;
    else {
      res.json(online);
    }
  });
});

router.delete('/deleteOnline', (req, res, next) => {
  Online.findByIdAndRemove(req.query.onlineID, (err, doc) => { 
    if (err) throw err;
  });
});

module.exports = router;