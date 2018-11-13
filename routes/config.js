const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const configDatabase = require('../config/database');

const Config = require('../models/config');

router.post('/addConfig', (req, res, next) => {

  console.log("In routes");
  let newConfig = new Config({
    firstNewsDOI: req.body.firstNewsDOI
  });

  console.log("in route with" + newConfig);

  Config.addConfig(newConfig, (err, config) => {
    if(err) {
      res.json({success: false, msg: 'Failed to add config file'});
    } 
    else {
      res.json({success: true, msg: 'Config file added'});
    }
  });

});

router.get('/getConfig', (req, res, next) => {
  Config.find({}, null, (err, config) => {
    if (err) throw err;
    else {
      res.json(config);
    }
  });
});

router.put('/updateConfig', (req, res, next) => {
  Config.update({'_id' : req.body.configID}, req.body, (err) => {
    if(err) throw err;
    res.json({success: true, msg: 'Config updated'});
  });
});

module.exports = router;