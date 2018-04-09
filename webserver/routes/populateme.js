var express = require('express')
var router = express.Router();
const subCategoryInformation = require('../models/subcategoryinformationmodel.js')
const categoryInformation = require('../models/categoryinformationmodel.js')
const brandInformation = require('../models/brandinformationmodel.js')
const productInformation = require('../models/productinformationmodel.js')
const catalogueInformation = require('../models/catalogueinformationmodel')
const ObjectId = require('mongodb').ObjectID;
var path = require('path')

router.post('/showCatalogue', function(req, res, next)
 {
  console.log("in show catalogue")
  console.log(req.body.shopID)
   catalogueInformation.aggregate( [  {  $match:  { shopid:ObjectId(req.body.shopID)} }, {  $group :  {  _id : "$categoryid" } }  ]  )
   .exec((err,data)=>{
      res.send(data)
    })

})
router.post('/showSubCategory', function(req, res, next) {
    catalogueInformation.aggregate( [  {  $match:  { $and:[{shopid:ObjectId(req.body.data[1])},{categoryid:req.body.data[0]}] } }, {  $group :  {  _id : "$subcategoryid" } }  ]  )
  .exec((err,data)=>{
     res.send(data)
   })
   });
   router.post('/showAllCatalogue', function(req, res, next) {
catalogueInformation.aggregate( [  {  $match:  { $and:[{shopid:ObjectId(req.body.data[0])},{categoryid:req.body.data[1]},{subcategoryid:req.body.data[2]}] } },
  {  $group :  {  _id : {brandid:"$brandid",productid:"$productid",discount:"$discount",price:"$price",productObjID:"$_id"} } }  ]  )
 .exec((err,data)=>{
   res.send(data)
 })
});
  router.post('/getbrands',function(req,res,next)
{

  catalogueInformation.aggregate(
    [
      {
        $match:
        {
          $and:
          [

              {shopid:ObjectId(req.body.data[0])},
              {categoryid:req.body.data[1]},
              {subcategoryid:req.body.data[2]}
            ]
      }

    },
    {
    $group :  {  _id :"$brandid"}
  }
    ]
  ).exec((err,data)=>{
    res.send(data)
  })
})
router.post('/getdiscounts',function(req,res,next)
{
  console.log(req.body.data[0]);
  console.log(req.body.data[1]);
  console.log(req.body.data[2])
  console.log(req.body.data[3]);

if(req.body.data[0]!=""&&req.body.data[1]===""&&req.body.data[2]===""&&req.body.data[3]==="")
{
  console.log("in if")
  catalogueInformation.aggregate([
      {
        $match:{shopid:ObjectId(req.body.data[0])}
      },{$group :  {  _id :"$discount"}}
    ]
  ).exec((err,data)=>{
    res.send(data)
    console.log(data);
  })
}
if(req.body.data[0]!=""&&req.body.data[1]!=""&&req.body.data[2]===""&&req.body.data[3]==="")
{
  console.log("in second if")
  catalogueInformation.aggregate([
      {
        $match:{$and:[{shopid:ObjectId(req.body.data[0])},{categoryid:req.body.data[1]}]}
      },{$group :  {  _id :"$discount"}}
    ]
  ).exec((err,data)=>{
    res.send(data)
    console.log(data);
  })
}
if(req.body.data[0]!=""&&req.body.data[1]!=""&&req.body.data[2]!=""&&req.body.data[3]==="")
{
  catalogueInformation.aggregate([
      {
        $match:{$and:[{shopid:ObjectId(req.body.data[0])},{categoryid:req.body.data[1]},{subcategoryid:req.body.data[2]}]}
      },{$group :  {  _id :"$discount"}}
    ]
  ).exec((err,data)=>{
    res.send(data)
    console.log(data);
  })
}
if(req.body.data[0]!=""&&req.body.data[1]!=""&&req.body.data[2]!=""&&req.body.data[3]!="")
{
  catalogueInformation.aggregate([
      {
        $match:{$and:[{shopid:ObjectId(req.body.data[0])},{categoryid:req.body.data[1]},{subcategoryid:req.body.data[2]},{brandid:req.body.data[3]}]}
      },{$group :  {  _id :"$discount"}}
    ]
  ).exec((err,data)=>{
    res.send(data)
    console.log(data);
  })
}
})


module.exports = router;
