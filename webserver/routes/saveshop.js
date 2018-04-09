'use strict';
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let userInformation = require('../models/userinformationmodel.js');
let VendorShop = require('../models/vendorshopmodel.js')
router.post('/save', function(req, res) {
  console.log(req.user.local.email+"in here to add a shop");
    let id = '';
    let name = '';
    var shopdata = new VendorShop({
        shopname: req.body.shopname,
        shopid:req.body.shopname.toLowerCase(),
        address: req.body.shopaddress,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        country: req.body.country,
        contactnumber: req.body.contactnumber,
        shopurl: req.body.shopurl,
        lat: req.body.latitude,
        lng: req.body.longitude,
        shopimg:req.body.shopimageurl
    })
    shopdata.save((err, result) => {
        if (err) {
            console.log(err);
        } else
        {
            id = result._id
            userInformation.findOne({"local.email": req.user.local.email}).exec((err, user) =>
            {
                user.local.shops.push(id);
                shopdata.vendorid = user._id;
                user.save();
                shopdata.save((err,result)=>{
                  res.send("Added Shop");
                });
           });
        }
    });

});


router.get('/showshop', function(req, res) {
  console.log(req.user.local+"in save shop database");
    userInformation.findOne({"local.email": req.user.local.email}).populate({path:'local.shops'}).exec((err, user) => {
        let shoparray = [];
    //    console.log(user.local)
      user.local.shops.map((item)=>{
      let obj={};
      obj.text= item.shopname;
      obj.value= item._id;
      shoparray.push(obj);
    })
      res.send(shoparray)
    });
});

router.get('/viewall', function(req, res)
{
    userInformation.findOne({"local.email": req.user.local.email}).populate({path:'local.shops'}).exec((err, user) => {
        let shoparray = [];
    //    console.log(user.local)
      user.local.shops.map((item)=>{
      shoparray.push(item);
    })
    console.log(shoparray)
    res.send(shoparray)
    });
});

router.post('/viewshopdetail', function(req, res)
{
      VendorShop.findOne({
          "_id": req.body.shopid
      }, function(err, profile) {
          if (err) {
              throw err;
          } else {
            console.log(profile);
              res.send(profile);
          }
      });
});
router.post('/updateshop', function(req, res)
{
  VendorShop.findOne({
      '_id': req.body.shopid
  }, function(err, shop) {
      if (err)
          throw err;
      else {
          console.log(shop);
         shop.shopname=req.body.shopname;
         shop.shopurl=req.body.shopurl;
         shop.contactnumber= req.body.contactnumber;
         shop.address= req.body.address;
         shop.city= req.body.city;
         shop.state= req.body.state;
         shop.country= req.body.country;
         shop.pincode= req.body.pincode;
         shop.lat= req.body.lat,
         shop.lng= req.body.long,
         shop.shopid= req.body.shopname.toLowerCase()

          shop.save(function(error, result) {
              if (error) {
                  throw error;
              } else {
                  res.send(result);
              }
          });
      }
  });
});

module.exports = router;
