'use strict';
var express = require('express');
var router = express.Router();
var userdata = require('../models/userinformationmodel');

//localhost:8082/updateuserprofile/getdata
router.get('/profile', function(req, res) {
  console.log(req.user.local.email);
    userdata.findOne({'local.email':req.user.local.email}).exec((err,result)=>{res.send(result)});
});

//localhost:8082/updateuserprofile/check old and new password
router.post('/check', function(req, res)
{
  let check = req.body.password;
  console.log(req.body.email);
  console.log(req.body.password);
  userdata.findOne({ 'local.password': req.body.password}, function(err, profile)
{
  if(profile)
  {
    res.send('verified');
}
else
{
   res.send('profile not found');
}
});
});

//localhost:8082/updateuserprofile/update new password
router.put('/updatepassword/:email', function(req, res)
{
  console.log(req.params.email);
  userdata.findOne({'local.email': req.user.local.email}, function(err, profile)
{
  if(err) throw err;
  else{
       profile.local.password = req.body.newpassword;

profile.save(function(error, result)
{
  if(error)
  {
    throw error;
  }
  else{
    res.send(result);

  }

   });
 }
});
});

//localhost:8082/updateuserprofile/insert
  router.post("/insertdata", function(req ,res) {
    if(req.body){
      var profiledata = new userdata();
      profiledata.local.firstName = req.body.firstName;
      profiledata.local.lastName= req.body.lastName;
      profiledata.local.gender= req.body.gender;
      profiledata.local.conntactnumber= req.body.conntactnumber;
      profiledata.local.email= req.body.email;
      profiledata.local.username = req.body.username;
      profiledata.local.dob = req.body.dob;
      profiledata.local.password = req.body.password;
      profiledata.save(function(err){
        if(err) {
          console.log(err);
          res.send("Error");
        }
        else{
          console.log("Saved");
          res.send("Saved data in the mongo" );
        }
      });
    }
    else{
      console.log("Saved dfdads");
      res.send("No data found");
    }
  });

  //localhost:8082/updateUserProfile/update
  router.put('/update', function(req, res){
  userdata.findOne({'local.email': req.body.email}, function(err, profile){
  if(err){
    throw err;
  }
  else{
     profile.local.name = req.body.name;
     profile.local.username = req.body.username;
     profile.local.gender = req.body.gender;
     profile.local.conntactnumber = req.body.conntactnumber;
     profile.local.password = req.body.password;
     profile.local.dob = req.body.dob;

    profile.save(function(err, result){
      if(err){
        throw error;
      }
      else{
        res.send(result);
      }
     });
    }
   });
  });


  module.exports = router;
