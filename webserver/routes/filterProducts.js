var express = require('express');
var router = express.Router();
const subCategoryInformation = require('../models/subcategoryinformationmodel.js')
const catalogueInformation = require('../models/catalogueinformationmodel.js')
const productInformation = require('../models/productinformationmodel.js')
const vendorInformation = require('../models/userinformationmodel.js')
const WishlistInfo = require('../models/wishlistinfo')
const ObjectId = require('mongodb').ObjectID;

router.post('/searchProduct', function(req, res, next) {
  console.log(req.body.pattern);
  catalogueinfomodels.find( 
      { $or: [  { categoryid: { $in: [ /req.body.pattern$/,/^req.body.pattern/ ] } }, 
                { subcategoryid: { $in: [ /req.body.pattern$/,/^req.body.pattern/ ] } },
                { brandid: { $in: [ /req.body.pattern$/,/^req.body.pattern/ ] } },
                { productid: { $in: [ /req.body.pattern$/,/^req.body.pattern/ ] } }]} )
.exec((err,data)=>{
  
   res.send(data)
 })


});
router.post('/showFilteredProduct', function(req, res, next) {
  console.log(req.body.QueryDecide+"1");
  switch(parseInt(req.body.QueryDecide)) {
    case 0:/*All products in that ShopID*/
        console.log("Case 0")
        catalogueInformation.aggregate([{$match:{shopid:ObjectId(req.body.shopID)}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 1:/*All products matching that Category in given ShopID*/
        console.log("Case 1")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{categoryid:req.body.Category}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 2:/*All products matching that SubCategory in given ShopID*/
        console.log("Case 2")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{subcategoryid:req.body.SubCategory}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 3:/*All products matching that SubCategory&Category in given ShopID*/
        console.log("Case 3")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{categoryid:req.body.Category},{subcategoryid:req.body.SubCategory}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 4:/*All products matching that Brand in given ShopID*/
        console.log("Case 4")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{brandid:req.body.Brand}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 5:/*All products matching that Brand&Category in given ShopID*/
        console.log("Case 5")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{categoryid:req.body.Category},{brandid:req.body.Brand}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 6:/*All products matching that Brand&SubCategory in given ShopID*/
        console.log("Case 6")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{subcategoryid:req.body.SubCategory},{brandid:req.body.Brand}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 7:/*All products matching that Brand&SubCategory&Category in given ShopID*/
        console.log("Case 7")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{categoryid:req.body.Category},{subcategoryid:req.body.SubCategory},{brandid:req.body.Brand}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 8:/*All products matching that Discount in given ShopID*/
        console.log("Case 8")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{discount:req.body.discount}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 9:/*All products matching that Discount&Category in given ShopID*/
        console.log("Case 9")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{categoryid:req.body.Category},{discount:req.body.discount}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 10:/*All products matching Discount&SubCategory that in given ShopID*/
        console.log("Case 10")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{subcategoryid:req.body.SubCategory},{discount:req.body.discount}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 11:/*All products matching that Discount&SubCategory&Category in given ShopID*/
        console.log("Case 11")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{categoryid:req.body.Category},{subcategoryid:req.body.SubCategory},{discount:req.body.discount}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 12:/*All products matching that Discount&Brand in given ShopID*/
        console.log("Case 12")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{brandid:req.body.Brand},{discount:req.body.discount}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 13:/*All products matching that Discount&Brand&Category in given ShopID*/
        console.log("Case 13")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{categoryid:req.body.Category},{brandid:req.body.Brand},{discount:req.body.discount}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 14:/*All products matching that Discount&Brand&SubCategory in given ShopID*/
        console.log("Case 14")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{subcategoryid:req.body.SubCategory},{brandid:req.body.Brand},{discount:req.body.discount}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 15:/*All products matching that Discount&Brand&SubCategory&Category in given ShopID*/
        console.log("Case 15")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{categoryid:req.body.Category},{subcategoryid:req.body.SubCategory},{brandid:req.body.Brand},{discount:req.body.discount}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 16:/*All products matching that Price in given ShopID*/
        console.log("Case 16")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{price:{$gte:parseInt(req.body.priceFrom)}},{price:{$lte:parseInt(req.body.priceTo)}}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 17:/*All products matching that Price&Category in given ShopID*/
        console.log("Case 17")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{categoryid:req.body.Category},{price:{$gte:parseInt(req.body.priceFrom)}},{price:{$lte:parseInt(req.body.priceTo)}}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 18:/*All products matching that Price&SubCategory in given ShopID*/
        console.log("Case 18")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{subcategoryid:req.body.SubCategory},{price:{$gte:parseInt(req.body.priceFrom)}},{price:{$lte:parseInt(req.body.priceTo)}}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 19:/*All products matching that Price&SubCategory&Category in given ShopID*/
        console.log("Case 19")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{categoryid:req.body.Category},{subcategoryid:req.body.SubCategory},{price:{$gte:parseInt(req.body.priceFrom)}},{price:{$lte:parseInt(req.body.priceTo)}}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 20:/*All products matching that Price&Brand in given ShopID*/
        console.log("Case 20")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{brandid:req.body.Brand},{price:{$gte:parseInt(req.body.priceFrom)}},{price:{$lte:parseInt(req.body.priceTo)}}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 21:/*All products matching that Price&Brand&Category in given ShopID*/
        console.log("Case 21")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{categoryid:req.body.Category},{brandid:req.body.Brand},{price:{$gte:parseInt(req.body.priceFrom)}},{price:{$lte:parseInt(req.body.priceTo)}}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 22:/*All products matching that Price&Brand&SubCategory in given ShopID*/
        console.log("Case 22")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{subcategoryid:req.body.SubCategory},{brandid:req.body.Brand},{price:{$gte:parseInt(req.body.priceFrom)}},{price:{$lte:parseInt(req.body.priceTo)}}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 23:/*All products matching that Price&Brand&SubCategory&Category in given ShopID*/
        console.log("Case 23")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{categoryid:req.body.Category},{subcategoryid:req.body.SubCategory},{brandid:req.body.Brand},{price:{$gte:parseInt(req.body.priceFrom)}},{price:{$lte:parseInt(req.body.priceTo)}}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 24:/*All products matching that Price&Discount in given ShopID*/
        console.log("Case 24")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{price:{$gte:parseInt(req.body.priceFrom)}},{price:{$lte:parseInt(req.body.priceTo)}},{discount:req.body.discount}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 25:/*All products matching that Price&Discount&Category in given ShopID*/
        console.log("Case 25")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{categoryid:req.body.Category},{price:{$gte:parseInt(req.body.priceFrom)}},{price:{$lte:parseInt(req.body.priceTo)}},{discount:req.body.discount}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 26:/*All products matching that Price&Discount&SubCategory in given ShopID*/
        console.log("Case 26")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{subcategoryid:req.body.SubCategory},{price:{$gte:parseInt(req.body.priceFrom)}},{price:{$lte:parseInt(req.body.priceTo)}},{discount:req.body.discount}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 27:/*All products matching that Price&Discount&SubCategory&Category in given ShopID*/
        console.log("Case 27")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{categoryid:req.body.Category},{subcategoryid:req.body.SubCategory},{price:{$gte:parseInt(req.body.priceFrom)}},{price:{$lte:parseInt(req.body.priceTo)}},{discount:req.body.discount}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 28:/*All products matching that Price&Discount&Brand in given ShopID*/
        console.log("Case 28")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{brandid:req.body.Brand},{price:{$gte:parseInt(req.body.priceFrom)}},{price:{$lte:parseInt(req.body.priceTo)}},{discount:req.body.discount}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 29:/*All products matching that Price&Discount&Brand&Category in given ShopID*/
        console.log("Case 29")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{categoryid:req.body.Category},{brandid:req.body.Brand},{price:{$gte:parseInt(req.body.priceFrom)}},{price:{$lte:parseInt(req.body.priceTo)}},{discount:req.body.discount}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 30:/*All products matching that Price&Discount&Brand&SubCategory in given ShopID*/
        console.log("Case 30")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{subcategoryid:req.body.SubCategory},{brandid:req.body.Brand},{price:{$gte:parseInt(req.body.priceFrom)}},{price:{$lte:parseInt(req.body.priceTo)}},{discount:req.body.discount}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 31:/*All products matching that Price&Discount&Brand&SubCategory&Category in given ShopID*/
        console.log("Case 31")
        catalogueInformation.aggregate([{$match:{$and:[{shopid:ObjectId(req.body.shopID)},{categoryid:req.body.Category},{subcategoryid:req.body.SubCategory},{brandid:req.body.Brand},{price:{$gte:parseInt(req.body.priceFrom)}},{price:{$lte:parseInt(req.body.priceTo)}},{discount:req.body.discount}]}}])
        .exec((err,data)=>{
          console.log(data);
          res.send(data)
         })
        break;
    case 32:/*All products matching product id*/
       console.log("case 32");
       console.log(req.body.productid)
       catalogueInformation.aggregate([{$match:{productid:req.body.productid}}])
       .exec((err,data)=>
     {
       console.log(data);
       res.send(data)
     })
       break;
    default:
    console.log(req.body.QueryDecide)
        res.send("Error")

}

});
module.exports = router;