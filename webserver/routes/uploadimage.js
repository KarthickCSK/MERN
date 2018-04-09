'use strict';
var express = require('express');
var router = express.Router();
var multer = require('multer');
const productInformation = require('../models/productinformationmodel.js')
var imageArr=[];
var fs = require('fs');
  var uploadedImages=''
/* Uploaded images stored in a given directory with extensions */
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './webclient/images/')
    },
    filename: function(req, file, cb) {
        let extArray = file.mimetype.split("/");
        var imagename=Date.now();
        let extension = extArray[extArray.length - 1];
        imageArr.push(file.fieldname+'_'+imagename+ '.' + extension)
        cb(null, file.fieldname + '_' +imagename+ '.' + extension)

   },function(){
      console.log(Date.now());
    }
});
const upload = multer({storage: storage});

/* POST to upload the images. */
router.post('/upload', upload.any('IMG'), function(req, res, next) {
    console.log('save');
      uploadedImages=imageArr;
    imageArr=[];
    console.log(uploadedImages);
    res.json({'images': uploadedImages});

});

router.post('/uploadInDb',function(req, res ,next){
  console.log(req.body.productid);
  productInformation.update({productid:req.body.productid},{$push: {"productimg":{img:uploadedImages}}},false,function(err,details){
   if(err){
     res.send(err);
   }
   else{
     res.send("added successfully");
   }
  })
});
router.post('/deletefromserver', function(req, res)
{
  console.log(req.body.imagename +"in deletee")
  var filePath = './webclient/images/'+req.body.imagename;
  fs.unlinkSync(filePath);
  res.send("successfully deleted")

})

router.post('/deletefromservercategory', function(req, res)
{
  console.log(req.body.imagename +"in deletee")
  var filePath = './webclient/categoryimages/'+req.body.imagename;
  fs.unlinkSync(filePath);
  res.send("successfully deleted")
})
router.post('/deletefromserversubcategory', function(req, res)
{
  console.log(req.body.imagename +"in deletee")
  var filePath = './webclient/subcategoryimages/'+req.body.imagename;
  fs.unlinkSync(filePath);
  res.send("successfully deleted")

})
router.post('/deletefromservershop', function(req, res)
{
  console.log(req.body.imagename +"in deletee")
  var filePath = './webclient/shopimages/'+req.body.imagename;
  fs.unlinkSync(filePath);
  res.send("successfully deleted")

})
module.exports = router;
