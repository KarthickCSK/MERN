var express = require('express');
var RegisteredUser = require('../models/userinformationmodel');
var router = express.Router();
var nodemailer = require('nodemailer');
var configAuth = require('../config/auth');
var rand;

/* GET users listing. */
/*USERNAME CHECKING*/
router.post('/checkUsername',function(req,res){
    console.log(req.body.username);
    RegisteredUser.findOne({'local.username': req.body.username},function(err,profile){
 if(err) {
        console.log(err);
        res.send(err);
           }
 else {
    if (profile) {
        res.send(true);
    }else{
        res.send(false);
    }


   }
});
});
router.post('/checkMail',function(req,res){
    console.log(req.body.mail);
    RegisteredUser.findOne({'local.email': req.body.mail},function(err,profile){

if(err) {

       console.log(err);
        res.send(err);

   }
 else {
    console.log(profile);
    if (profile) {
        res.send(true);
    }else{
        res.send(false);
    }


   }
});
});
router.post('/checkMailAtFPassword',function(req,res){
    console.log(req.body.mail);
    RegisteredUser.findOne({'local.email': req.body.mail},function(err,profile){

if(err) {

       console.log(err);
        res.send(err);

   }
 else {
    console.log(profile.length);
    if (profile.verified) {
        res.send(true);
    }else{
        res.send(false);
    }


   }
});
});


router.get('/logout', function(req, res) {
console.log("came");
             req.logout();
               res.send("logout");
         });
     function isLoggedIn(req, res, next) {    // if user is authenticated in the session, carry on

         if (req.isAuthenticated()){

               alert("req is authenticated!");

               return next();

           }    // if they aren't redirect them to the home page

           res.redirect('/');

        }
module.exports = router;