'use strict';
var express = require('express');
var router = express.Router();
var multer = require('multer');
const subCategoryInformation = require('../models/subcategoryinformationmodel.js');
var imageArr=[];
var imageArrcategory=[];
var imageArrsubcategory=[];
  var uploadedImages='';
  var uploadedImagescategory='';
  var uplaodedImagessubcategory='';
/* Uploaded images stored in a given directory with extensions */
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './webclient/subcategoryimages/')
    },
    filename: function(req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        var imagename = Date.now();
        imageArrsubcategory.push(file.fieldname+'_'+imagename+ '.' + extension)
        cb(null, file.fieldname + '_' +imagename+ '.' + extension)
   },function(){
      console.log(Date.now());
    }
});
const upload = multer({storage: storage});
/* POST to upload the images. */
router.post('/uploadsubcategory', upload.any('IMG'), function(req, res, next) {
    console.log('save in subcategory');
      uplaodedImagessubcategory=imageArrsubcategory;
    imageArrsubcategory=[];
    console.log(uplaodedImagessubcategory);
    res.json({'imagessubcategory': uplaodedImagessubcategory});
});
router.post('/uploadInDbsubcategory',function(req, res ,next){
  console.log("db in subcategory");
  console.log(req.body.subcategoryid);
  subCategoryInformation.update({subcategoryid:req.body.subcategoryid},{$push: {"subcategoryimg":{img:uplaodedImagessubcategory}}},false,function(err,detailssubcategory){
   if(err){
     res.send(err);
   }
   else{
     res.send("added successfully");
   }
  })
});
module.exports = router;
