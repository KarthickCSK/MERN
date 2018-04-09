'use strict';
var express = require('express');
var router = express.Router();
var multer = require('multer');
const vendorshopmodel = require('../models/vendorshopmodel.js');
var imageArrshop=[];
var uploadedImagesshop=[];
/* Uploaded images stored in a given directory with extensions */
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './webclient/shopimages/')
    },
    filename: function(req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        imageArrshop.push(file.fieldname+'_'+Date.now() + '.' + extension)
        cb(null, file.fieldname + '_' + Date.now() + '.' + extension)
   },function(){
      console.log(Date.now());
    }
});
const upload = multer({storage: storage});
/* POST to upload the images. */
router.post('/uploadshopimage', upload.any('IMG'), function(req, res, next) {
    console.log('save in shop');
    console.log(imageArrshop);
      uploadedImagesshop=imageArrshop;
    imageArrshop=[];
    console.log(uploadedImagesshop);
    res.json({'imagesshop': uploadedImagesshop});
});
module.exports = router;
