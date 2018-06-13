const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const moment = require('moment');


//Connect to database
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
	console.log('Connected to database ' + config.database);
})

mongoose.connection.on('error', () => {
	console.log('Database error' + err);
})

const app = express();
const users = require('./routes/users');
const docs = require('./routes/docs');
const sections = require('./routes/sections');
//const ads = require('./routes/ads');
//const codes = require('./routes/codes');
//const editors = require('./routes/editors');
//const se = require('./routes/se');
//const online = require('./routes/online');
//const print = require('./routes/print');

//const port = 3000; //This is port for local development
const port = process.env.PORT || 8080; //This is for deployment to Heroku

//Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Routes
app.use('/users', users)
app.use('/docs', docs)
app.use('/sections', sections)
//app.use('/ads', ads)
//app.use('/codes', codes)
//app.use('/editors', editors)
//app.use('/se', se)
//app.use('/online', online)
//app.use('/print', print)
//
//Index Route
app.get('/', (req, res) => {
	res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Start Server
app.listen(port, () => {
	console.log('Server started on port ' + port);
});

module.exports = app;