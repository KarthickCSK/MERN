var express = require('express');
var router = express.Router();
const catalogueInformation = require('../models/catalogueinformationmodel.js')

router.post('/addreviews',function(req,res,next){
//console.log(req.user.local.username);
console.log(req.body.id);
console.log(req.body.value);
console.log(req.body.rate);
console.log(req.body.date);
  const id=req.body.id;
  const user='priya';
  catalogueInformation.update({_id:id},{$push: {"reviews":{rating:req.body.rate,comments:req.body.value,date:req.body.date,user:user}}},false,function(err,details){
    if(err){
    res.send(err);
    }
    else{
    res.send("added successfully");
 }
  })
})

router.post('/getreviews',function(req,res,next){
  var id=req.body.id;
catalogueInformation.find({_id:id},function(err,details){
  res.send(details);
})
})

module.exports = router;
