var express = require('express');
var RegisteredUser = require('../models/userinformationmodel');
var router = express.Router();
var nodemailer = require('nodemailer');
var configAuth = require('../config/auth');
var rand;
var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');

/*E-MAIL VERIFICATION SENDING*/
var host,link,mailOptions;
router.post('/mailVerify', function handleSayHello(req, res) {
    console.log(req.body.data);
    RegisteredUser.findOne({'local.username': req.body.data  },function(err,profile){
 if(err) {
      res.send(err);
       console.log('error ocuured');
 }
 else {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {/* */
            user: 'karthick16695@gmail.com', // Your email id:contactagreegator@gmail.com
            pass: 'aadukalam' // Your password:password@2017
        } ,
        tls: {
        rejectUnauthorized: false 
    } 
    });

console.log('profile',profile);
host=req.get('host');
var payload = profile.local.email;
var email= urlCrypt.cryptObj(payload);
var verficationid = profile.local.verificationID;
var id = urlCrypt.cryptObj(verficationid);

link="http://"+req.get('host')+"/aVerification/verify?id="+id+"&email="+email;
var text = 'Hello world from \n\n' + req.body.data;
mailOptions = {
    from: 'contactagreegator@gmail.com', // sender address
    to: profile.local.email, // list of receivers
    subject: 'Activate your Account',// Subject line
    text: text,
    html : "Hello,<br> Please Click below to verify your email.<br><a href="+link+"><img src=\"http://imoactivate.com/images/activateB.gif\"/></a>"
    };
    console.log(profile.local.email+host);
    transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.send("Mail sent Failed");
    }else{
        console.log('Message sent: ' + info.response);
        res.send("Successfully Register, Go and Check your mail to Activate your account")
    };
    });
}
});
});

/*E-MAIL VERIFICATION RECEVING*/
router.get('/verify',function(req,res){
  try {
    host='localhost:8080';
    var id = urlCrypt.decryptObj(req.query.id);
    RegisteredUser.findOne({'local.email': urlCrypt.decryptObj(req.query.email) },function(err,profile){//GETTING PROFILE FOR CHECKING
 if(err) {
      res.send(err);
       console.log('error occured');
    }
 else {
       if(profile != null)
       {
         console.log(req.protocol+"://"+req.get('host')+":"+("http://"+host));

             console.log("Domain is matched. Information is from Authentic email", profile.local.verificationID);
             console.log(id);
             if (profile.local.verificationID == 0)
             {
                 console.log("Already verified",  req.query.id);
                 res.redirect('/#/login?msg=Already Verified Please Login');
             }
             else if(id == profile.local.verificationID)
             {
                 console.log("email is verified",  id);
                 console.log(req.query.email);
                 //GETTING PROFILE FOR CHANGING
                 RegisteredUser.update({'local.email': urlCrypt.decryptObj(req.query.email)},{$set:{'local.verified':true,'local.verificationID':0}},function(err)
                 {
                     if(err)
                     {
                       console.log(err);
                     }
                     else
                     {
                       res.redirect('/#/login');
                     }
                  });
             }
             else
             {
               res.redirect('/#/login?msg=Verification URL is incorrect');
             }
       }
       else
       {
         res.redirect('/#/login?msg=Verification URL is incorrect');
       }
    }

});
} catch(e) {

  // The link was mangled or tampered with.
  return res.redirect('/#/login?msg=Bad Request in url');
}
});

module.exports = router;
