const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/users');

router.post('/register', (req, res, next) => {

  let newUser = new User({
	username: req.body.username,
	password: req.body.password
  });

  User.getUserByUsername(newUser.username, (err, user) => {
	if(err) throw err;
	if(user) {
	  return res.json({success: false, msg: 'Username already registered'});
	}
	User.addUser(newUser, (err, user) => {
	  if(err) {
		res.json({success: false, msg: 'Failed to register user'});
	  } 
	  else {
		res.json({success: true, msg: 'User registered'});
	  }
	});
  });
});


router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.getUserByUsername(username, (err, user) => {
	if(err) throw err;
	if(!user) {
	  return res.json({success: false, msg: 'User not found'});
	}
	User.comparePassword(password, user.password, (err, isMatch) => { 
	  if (err) throw err;
	  if(isMatch) {
		const token = jwt.sign(user.toJSON(), config.secret, { //added ".toJSON()" to user to fix bug
		expiresIn: 604800 //1 week
	  });
  	  res.json({
		success: true,
		token: 'JWT ' + token,
		user: {
		  id: user._id,
		  username: user.username,
		}
	  });
	  } 
	  else {
		return res.json({success: false, msg: 'Wrong password'});
	  }
	});
  });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
	res.json({user: req.user});
});

module.exports = router;