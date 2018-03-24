var express = require('express');
var app = express();
var db = require('./db');
var PodcastController = require('./user/PodcastController');

app.use('/podcast', PodcastController);

module.exports = app;
