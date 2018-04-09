'use strict';
// loading up the required stratigies
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;

// loading up the configuration file containing facebook and goole authentication configuration
var configAuth = require('./auth');

// load up the user model
const User = require('../models/userinformationmodel');

module.exports = function(passport) {
  // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
      console.log("serializeUser");
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
      console.log("deserializeUser");
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

      /*LOCAL LOGIN STRATEGY*/
      passport.use(new LocalStrategy({
          usernameField: 'username',
          passwordField: 'password',
          session: false,
          passReqToCallback: true
      },
      function(req, username, password, done) {
          process.nextTick(function() {
              User.findOne({
                  'local.username': username
              }, function(err, user) {
                  if (err) {
                      return done("Enter Credentials");
                  }
                  else if (!user) {

                      const error = new Error('Email ID not registered');
                      error.name = 'Incorrect Credentials';
                      return done("Email ID not registered");
                  }
                  else if (!(user.local.password === password)) {
                    console.log(user);
                      const error = new Error('Incorrect password');
                      error.name = 'Incorrect Credentials';
                      return done('Incorrect password');
                  }
                  else if(!user.local.verified){
                      const error = new Error('Email ID not Verified');
                      error.name = 'Go check ur mail for verification';
                      return done('Email ID is not Verified Check your mail');

                  } else {
                      console.log("Login passport called");

                      let userData = {};
                      userData._id = user._id;
                      userData.email = user.local.email;
                      userData.authType = user.local.authType;
                      userData.token = User.generateToken(userData.email);
                      userData.userType = user.local.userType;
                      userData.username = user.local.username;
                      return done(null, userData);
                  }
              });
          });
      }));


        // =========================================================================
        // FACEBOOK ================================================================
        // =========================================================================
        var fbStrategy = configAuth.FACEBOOK;
        fbStrategy.passReqToCallback = true;  // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        passport.use(new FacebookStrategy(fbStrategy,
        function(req, token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function() {

                // check if the user is already logged in
                if (!req.user) {

                    User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                        if (err)
                            return done(err);

                        if (user) {

                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.facebook.token) {
                                user.facebook.token = token;
                             user.facebook.gender = profile.gender;

                                // user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                                user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                                user.facebook.photo=profile.photos[0].value
                                user.facebook.authType = "facebook";
                                user.facebook.name = profile.displayName;
                                user.save(function(err) {
                                    if (err)
                                        return done(err);

                                    return done(null, user);
                                });
                            }

                            return done(null, user); // user found, return that user
                        } else {
                            // if there is no user, create them
                            var newUser            = new User();

                            newUser.facebook.id    = profile.id;
                            newUser.facebook.token = token;
                            newUser.facebook.gender = profile.gender;

                            // newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();
                            newUser.facebook.photo=profile.photos[0].value;
                            newUser.facebook.authType = "facebook";
                            newUser.facebook.name = profile.displayName;
                            newUser.save(function(err) {
                                if (err)
                                    return done(err);

                                return done(null, newUser);
                            });
                        }
                    });

                } else {
                    // user already exists and is logged in, we have to link accounts
                    var user            = req.user; // pull the user out of the session

                    user.facebook.id    = profile.id;
                    user.facebook.token = token;
                   user.facebook.gender = profile.gender;

                    // user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                    user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                    user.facebook.photo = profile.photos[0].value;
                    user.facebook.authType = "facebook";
                    user.facebook.name = profile.displayName;
                    user.save(function(err) {
                        if (err)
                            return done(err);

                        return done(null, user);
                    });

                }
            });

        }));
// Google
    passport.use(new GoogleStrategy({

            clientID: configAuth.GOOGLE.clientID,
            clientSecret: configAuth.GOOGLE.clientSecret,
            callbackURL: configAuth.GOOGLE.callbackURL,
            // allows us to pass in the req from our route (lets us check if a user is logged in or not)
            passReqToCallback: true
        },
        function(req, token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function() {
                // check if the user is already logged in
                if (!req.user) {
                    User.findOne({
                        'google.id': profile.id
                    }, function(err, user) {
                        if (err){
                          return done(err);
                        }
                        if (user) {
                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.google.token) {
                                user.google.token = token;
                                user.google.name = profile.displayName;
                                 // pull the first email
                               user.google.gender = profile.gender;
                                user.google.photo=profile.photos[0].value;
                                user.google.email = (profile.emails[0].value || '').toLowerCase();
                                user.google.authType = "google";

                                user.save(function(error) {
                                    if (error) {
                                      return done(err);
                                    }
                                    return done(null, user);
                                });
                            }

                            return done(null, user);
                        } else {

                            var newUser = new User();
                            newUser.google.id = profile.id;
                            newUser.google.token = token;
                            newUser.google.gender = profile.gender;
                            newUser.google.photo=profile.photos[0].value;
                            newUser.google.name = profile.displayName;
                            // pull the first email
                            newUser.google.email = (profile.emails[0].value || '').toLowerCase();
                            newUser.google.authType = "google";

                            newUser.save(function(error) {
                                if (error) {
                                    return done(err);
                                }

                                return done(null, newUser);
                            });
                        }
                    });

                } else {
                    // user already exists and is logged in, we have to link accounts
                    // pull the user out of the session
                    let user = req.user;

                    user.google.id = profile.id;
                    user.google.token = token;
                    user.google.name = profile.displayName;
                    // pull the first email
                    user.google.gender = profile.gender;
                    user.google.photo=profile.photos[0].value;
                    user.google.email = (profile.emails[0].value || '').toLowerCase();
                    user.google.authType = "google";

                    user.save(function(err) {
                        if (err) {
                            return done(err);
                        }

                        return done(null, user);
                    });
                }
            });
        }));
};
