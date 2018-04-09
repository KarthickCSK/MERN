'use strict';
var express = require('express');
var router = express.Router();
const CategoryInformation = require('../models/categoryinformationmodel.js')
const subCategoryInformation = require('../models/subcategoryinformationmodel.js')
const catalogueInformation = require('../models/catalogueinformationmodel.js')
const productInformation = require('../models/productinformationmodel.js')
const vendorInformation = require('../models/userinformationmodel.js')
const WishlistInfo = require('../models/wishlistinfo')
const ObjectId = require('mongodb').ObjectID;

router.post('/showCatalogue', function(req, res, next) {
  var responsearray=[];
  catalogueInformation.aggregate( [  {  $match:  { shopid:ObjectId(req.body.shopID) } }, {  $group :  {  _id : "$categoryid",TopDiscount:{$max:"$discount"} } } ]  )
  .exec((err,data)=>{
    var length=data.length;
    var i=0;
  var arr= data.map(function(items,index)
    { 
      var a=(items._id).toString()
     CategoryInformation.find({"categoryid":a}).exec((err, category) =>
            {
              items.img=category[0].categoryimg[0].img;
              responsearray.push(items);
              if(data.length-1===index){
                res.send(responsearray);
              }
            });
    })
      })

});
router.post('/showSubCategory', function(req, res, next) {
  var responsearray=[];
	catalogueInformation.aggregate( [  {  $match:  { $and:[{shopid:ObjectId(req.body.shopID)},{categoryid:req.body.categoryID}] } }, {  $group :  {  _id : "$subcategoryid",TopDiscount:{$max:"$discount"}  } }  ]  )
  .exec((err,data)=>{
    var arr= data.map(function(items,index)
    { 
     subCategoryInformation.find({"subcategoryid":items._id}).exec((err, subcategory) =>
            {
              items.img=subcategory[0].subcategoryimg[0].img;
              responsearray.push(items);
              res.send(responsearray);
            });
    })
   })




});
router.post('/showAllCatalogue', function(req, res, next) {
catalogueInformation.aggregate( [  {  $match:  { $and:[{shopid:ObjectId(req.body.shopid)},{categoryid:req.body.cid},{subcategoryid:req.body.sid}] } },
  {  $group :  {  _id : {brandid:"$brandid",productid:"$productid",discount:"$discount",price:"$price",productObjID:"$_id"} } }  ]  )
 .exec((err,data)=>{
  console.log(data);
   res.send(data)
 })



});


router.post('/showShops', function(req, res, next) {
vendorInformation.findOne({"local.email": req.body.email}).populate({path:'local.shops'}).exec((err, user) => {
        let shoparray = [];
     user.local.shops.map((item)=>{
      let obj={};
      obj.text= item.shopname;
      obj.value= item._id;
      shoparray.push(obj);
    })
    res.send(shoparray)
    });


});
router.post('/showProduct', function(req, res, next) {
catalogueInformation.find({_id:ObjectId(req.body.productID)}).populate('shopid').exec((err,data)=>{

   res.send(data[0])
 })


});
router.post('/showProductlist', function(req, res, next) {
 catalogueInformation.aggregate( [  {  $match:  { shopid:ObjectId(req.body.shopID)} }, {  $group :  {  _id : "$productid" } }  ]  )
 .exec((err,data)=>{
    res.send(data)
  })
});
router.post('/showAllProduct', function(req, res, next) {
  catalogueInformation.find({}).populate('shopid').exec((err,data)=>{

   res.send(data[0])
 })


});
router.post('/Addtowishlist', function(req, res){
if(req.body)
{
 var wish=new WishlistInfo();
 wish.username=req.body.username;
 wish.brandid=req.body.brandid;
 wish.productid=req.body._id;
 wish.productimg=req.body.productimg;
 wish.category=req.body.categoryid;
 wish.product=req.body.productid;
 wish.price=req.body.price;
 wish.discount=req.body.discount;
 wish.expectedprice=req.body.price;
 wish.description=req.body.description;
 wish.seller=req.body.shopid;
  wish.shopname=req.body.shopid.shopname;
  wish.shopurl=req.body.shopid.shopurl;
  wish.address=req.body.shopid.address;
  wish.city=req.body.shopid.city;
  wish.state=req.body.shopid.state;
  wish.pincode=req.body.shopid.pincode;
   wish.save(function(err,data){
     if(err) {
      console.log(err);
      res.send("Error in saving the wishlist "+err);
    }
    else{
      res.send(data);
    }
  });
 }
 else{
  res.send("No data found for saving the wishlist");
}
});
router.post('/checkwishlist',function(req,res,next){
var id= req.body.wish._id;
 WishlistInfo.find({productid:id},function(err,data){
   if(err){
     res.send(err);
   }
   else{
     res.send(data);
   }
 })
})
router.post('/view', function(req, res, next) {
  const username=req.body.username;
  WishlistInfo.find({username:username},function(err,list){
    if(err) {
      res.send(err);
    }
    else {
     var wishlistobject=[];
     list.forEach(function(listwish,ind){
      wishlistobject[ind]=listwish;

    });
     res.send(wishlistobject);
   }
 });
});

router.put('/update', function(req, res){
 if(req.body)
 {
  requ1=req.body.product;
  requ2=req.body.expectedprice;
  WishlistInfo.update({product:req.body.product},{$set:{expectedprice:req.body.expectedprice}},function(err){

   if(err) {
     res.send(err);
   }
   else  {
     res.send("Expected price updated");
   }
 });
}
});





router.delete("/deletewishlist",function(req,res) {
  if(req.body){
    WishlistInfo.remove({product:req.body.product},function(err){
      if(err){
        res.send("Error in deleting the data");
      }
      else{
        res.send({msg:true,data:req.body})
      }
    });
  }
  else{
    res.send("no data found to delete");
  }
});
router.post('/addquestion',function(req,res,next){
  const id=req.body.id;
  catalogueInformation.update({_id:ObjectId(id)},{$push: {"questions":{question:req.body.question,date:req.body.date,answer:'',user:req.body.user}}},false,function(err,details){
    if(err){
    res.send(err);
    }
    else{
    res.send("added successfully");
 }
  })
})

router.post('/addreviews',function(req,res,next){
  const id=req.body.id;
  catalogueInformation.update({_id:ObjectId(id)},{$push: {"reviews":{rating:req.body.rate,comments:req.body.value,date:req.body.date,user:req.body.user}}},false,function(err,details){
    if(err){
    res.send(err);
    }
    else{
    res.send("added successfully");
 }
  })
})
module.exports = router;
//req.body.Category
