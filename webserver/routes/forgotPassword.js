var express = require('express');
var RegisteredUser = require('../models/userinformationmodel');
var router = express.Router();
var nodemailer = require('nodemailer');
var configAuth = require('../config/auth');
var rand;
var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');

/*FORGOT PASSWORD*/
router.post('/forgetPassword', function password(req, res) {
    rand=Math.floor((Math.random() * 100) + 54);
    RegisteredUser.update({'local.email': req.body.email},{$set:{'local.verificationID':rand}},function(err){

    if(err) {
              console.log(err);
            }
            else  {
            console.log("id changed");
            }
          });
    console.log(req.body.email);
    RegisteredUser.findOne({'local.email': req.body.email},function(err,profile){

 if(err) {
      res.send(err);
       console.log('not registered sign up please');

 }
 else {
    console.log(profile);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        secure: false,
        auth: {
            user: 'contactagreegator@gmail.com', // Your email id
            pass: 'password@2017' // Your password
        },
        tls: {
        rejectUnauthorized: false
    }
    });
var payload = profile.local.email;
var email= urlCrypt.cryptObj(payload);

host=req.get('host');
link="http://"+req.get('host')+"/fPassword/newPassword?id="+urlCrypt.cryptObj(rand)+"&email="+email;
var text = 'Hello world from \n\n' + req.body.data;
mailOptions = {
    from: 'contactagreegator@gmail.com', // sender address
    to: profile.local.email, // list of receivers
    subject: 'Reset your password',// Subject line
    text: text,
    html : "Hello,<br> Please Click below to set new password.<br><a href="+link+"><img src=\"https://t3.ftcdn.net/jpg/00/32/38/84/160_F_32388489_UTqpxbVdi4nWDp2wxNFzGT7nESh1Aq9V.jpg\" style={{width:'-100px',height:'30px'}}/></a>"
    };
    console.log(mailOptions+host);
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'+error});//MESSAGE ON SUCCESSFUL VERIFICATION MAIL SENT
    }else{
        console.log('Message sent: ' + info.response);
        res.redirect('/#/');
    };
    });
}
});

});
 router.get('/newPassword',function(req,res){
   try{
   console.log(urlCrypt.decryptObj(req.query.id)+"----id1111");
   console.log(req.query.id+"----id");
    RegisteredUser.findOne({'local.verificationID': urlCrypt.decryptObj(req.query.id)},function(err,profile){
console.log(profile);
 if(err) {
      res.send(err);
       console.log('error occured hiii');
    }

 else if(profile){

        res.redirect('/#/changepassword?id='+req.query.id+'&email='+req.query.email);//SUCCESSFULL REDIRECTION TO CHANGE PASSWORD
    }else{
        res.redirect('/#/login?msg=Link Expired. Signin or request for password change');
    }
});
}catch(e) {
  // The link was mangled or tampered with.
  return res.redirect('/#/login?msg=Bad Request in url');
}
});

router.post('/updatepassword',function(req,res){
  try{
  console.log("inside update");
    console.log(req.body.id+"----id-----");
   var id=urlCrypt.decryptObj(req.body.id);
   console.log(id+"-----sdfghj");
    RegisteredUser.findOne({'local.verificationID':id},function(err,profile){//GETTING PROFILE FOR CHECKING

 if(err) {
      res.send(err);
       console.log('error occured updated');
    }
 else{
    console.log(profile);
            if(profile)
            {
                console.log("email is verified"+id);
                //GETTING PROFILE FOR CHANGING
                RegisteredUser.update({'local.verificationID':id},{$set:{'local.password':req.body.pass,'local.verificationID':0}},function(err){
                    if(err) {
                              console.log(err);
                            }
                            else  {
                            console.log("Password changed");
                            }
                          });
                res.send(true);
            }
            else
            {
                console.log("Link expired");
                res.send(false);
            }
 }
});
}
catch(e) {
  // The link was mangled or tampered with.
  return res.redirect('/#/login?msg=Bad Request in url');
}
});

module.exports = router;
