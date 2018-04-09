var express = require('express');
var RegisteredUser = require('../models/userinformationmodel');
var router = express.Router();
var passport=require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var nodemailer = require('nodemailer');

// loading up the configuration file containing facebook and goole authentication configuration
var configAuth = require('../config/auth');
var rand;

/*LOCAL SIGNUP*/
router.post('/signup', function(req, res) {
    rand=Math.floor((Math.random() * 100) + 54);
    var newUser=new RegisteredUser();
    newUser.local.name = req.body.FirstName+req.body.LastName;
    newUser.local.gender=req.body.Gender;
    newUser.local.dob=req.body.dob;
    newUser.local.conntactnumber=req.body.phonenumber;
    newUser.local.email = req.body.email;
    newUser.local.username = req.body.username;
    newUser.local.password =req.body.pwd;
    newUser.local.userType=req.body.userType;
    newUser.local.verified=false;
    newUser.local.verificationID=rand;
    newUser.local.authType = "local";
    newUser.save(function(err){
        if(err)
        {
            res.send('Error in registration');
        }
        else
        {
            res.send("Successfully Register, Go and Check your mail to Activate your account");
        }
    });
});


router.get('/login',
  passport.authenticate('local'),
  function(req ,res)
  {
    console.log(req.user);
    res.cookie('token', req.user.token);
    res.cookie('authType', req.user.authType);
    res.cookie('username', req.user.username);
    res.send(req.user.userType);
});


router.get('/logout', function(req, res) {
        req.logout();
        res.clearCookie('token');
        res.clearCookie('authType');
        res.clearCookie('userType');
        res.clearCookie('gender');
        res.clearCookie('photos');
        res.clearCookie('email');
        res.clearCookie('username');



        res.json({logout:"Successfully LogOut"});
    });

 // *******************************************
   // Facebook authentication routes
   // *******************************************
   // send to facebook to do the authentication

   router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }) ,(req, res) =>
   {
              res.json(req.user);
   });

   // handle the callback after facebook has authenticated the user
   router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/#/' }), (req, res) =>
   {
     res.cookie('token', req.user.facebook.token);
     res.cookie('authType', req.user.facebook.authType);
     res.cookie('username',req.user.facebook.name);
     res.cookie('email',req.user.facebook.email);
     res.cookie('gender',req.user.facebook.gender);
     res.cookie('photos',req.user.facebook.photo);

   

     res.redirect('/#/home');
  });
   // *******************************************
   // Google authentication routes
   // *******************************************
   //  send to google to do the authentication
   router.get('/google', passport.authorize('google', { scope: ['profile', 'email'] }) ,(req, res) =>
   {
     res.json(req.user);
   });

   // the callback after google has authorized the user
   router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/#/' }), (req, res) =>
   {
      res.cookie('token', req.user.google.token);
      res.cookie('authType', req.user.google.authType);
      res.cookie('userType', 'Customer');
      res.cookie('username',req.user.google.name);
      res.cookie('email',req.user.google.email);
      res.cookie('gender',req.user.google.gender);
      res.cookie('photos',req.user.google.photo);



      res.redirect('/#/home');
  });

  router.get('/userinfo',  function(req, res)
  {
    console.log("userinfo called");
    console.log(req.user);
    res.json({user : req.user});
  });


  // route middleware to ensure user is logged in
  function isLoggedIn(req, res, next) {
      if (req.isAuthenticated())
          return next();
      res.redirect('/#/');
  }
module.exports = router;
