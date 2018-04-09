'use strict';
var express = require('express');
var router = express.Router();
var multer = require('multer');
const categoryInformation = require('../models/categoryinformationmodel.js');
var imageArr=[];
var imageArrcategory=[];
  var uploadedImages='';
  var uploadedImagescategory='';
/* Uploaded images stored in a given directory with extensions */
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './webclient/categoryimages/')
    },
    filename: function(req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        var categoryimagename=Date.now()
        imageArrcategory.push(file.fieldname+'_'+categoryimagename+ '.' + extension)
        cb(null, file.fieldname + '_' + categoryimagename +'.' + extension)
   },function(){
      console.log(Date.now());
    }
});
const upload = multer({storage: storage});
/* POST to upload the images. */
router.post('/uploadcategory', upload.any('IMG'), function(req, res, next) {
    console.log('save in category');
      uploadedImagescategory=imageArrcategory;
    imageArrcategory=[];
    console.log(uploadedImagescategory);
    res.json({'imagescategory': uploadedImagescategory});
});
router.post('/uploadInDbcategory',function(req, res ,next){
  console.log("db in category");
  console.log(req.body.categoryid);
  categoryInformation.update({categoryid:req.body.categoryid},{$push: {"categoryimg":{img:uploadedImagescategory}}},false,function(err,detailscategory){
   if(err){
     res.send(err);
   }
   else{
     res.send("added successfully");
   }
  })
});
module.exports = router;
