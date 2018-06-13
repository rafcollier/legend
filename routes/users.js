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

router.get('/getUsers', (req, res, next) => {
  //Doc.find({'docUsername' : req.query.docUsername}, null, {limit: Number(limit), sort: {dateEntered: -1}}, (err, docs) => {
  User.find({}, null, {sort: {username: 1}}, (err, users) => {
    if (err) throw err;
    res.json(users);
  });
});

router.delete('/deleteUser', (req, res, next) => {
  User.findByIdAndRemove(req.query.docID, (err, doc) => { 
    if (err) throw err;
  });
});

module.exports = router;