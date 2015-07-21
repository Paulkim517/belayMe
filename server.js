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

// middleware to manage sessions
app.use('/', function (req, res, next) {
  // saves userId in session for logged-in user
  req.login = function (user) {
    req.session.userId = user.id;
  };

  // finds user currently logged in based on `session.userId`
  req.currentUser = function (callback) {
    User.findOne({_id: req.session.userId}, function (err, user) {
      req.user = user;
      callback(null, user);
    });
  };

  // destroy `session.userId` to log out user
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  };

  next();
});


//STATIC ROUTES//
//get static index
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});
//get static js
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/js/route_magic.js');
});
//get static css
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/css/route_style.css' );
});

// profile page
app.get('/profile', function (req, res) {
  // check for current (logged-in) user
  req.currentUser(function (err, user) {
    // show profile if logged-in user
    if (user) {
      res.sendFile(__dirname + '/public/views/profile.html');
      res.sendFile(__dirname + '/public/js/route_magic.js');
      res.sendFile(__dirname + '/public/css/route_style.css' );
    // redirect if no user logged in
    } else {
      res.redirect('/');
    }
  });
});

// AUTH ROUTES (SIGN UP, LOG IN, LOG OUT)

// create new user with secure password
app.post('/users', function (req, res) {
  var newUser = req.body.user;
  User.createSecure(newUser, function (err, user) {
    // log in user immediately when created
    req.login(user);
    res.redirect('/profile');
  });
});

// authenticate user and set session
app.post('/login', function (req, res) {
  var userData = req.body.user;
  User.authenticate(userData.email, userData.password, function (err, user) {
    req.login(user);
    res.redirect('/profile');
  });
});

// log out user (destroy session)
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


// listen on port 3000
app.listen(process.env.PORT || 3000)
  console.log("It's ALIVE!!");














