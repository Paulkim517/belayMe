var express = require('express'),
    app = express(),
    _ = require('underscore-node'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

//connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/project1' 
);

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));



//STATIC ROUTES//
//get static index
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});
//get static js
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/js/route_magic.js');
});
//get statis css
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/css/route_style.css' );
});



// listen on port 3000
app.listen(process.env.PORT || 3000)
  console.log("It's ALIVE!!");














