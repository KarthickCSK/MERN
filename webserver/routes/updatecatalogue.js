'use strict';
const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const categoryInformation = require('../models/categoryinformationmodel.js');
const subCategoryInformation = require('../models/subcategoryinformationmodel.js');
const brandInformation = require('../models/brandinformationmodel.js');
const productInformation = require('../models/productinformationmodel.js')
const catalogueInformation = require('../models/catalogueinformationmodel.js')
const vendorShop = require('../models/vendorshopmodel.js');
const userInformation = require('../models/userinformationmodel.js');
const CatalogueInformation = require('../models/catalogueinformationmodel.js')
const ObjectId = require('mongodb').ObjectID;

router.get('/', function(req, res) {
    res.send("hello update")
})
function pair(itemset) {
    let array = [];
    itemset.forEach((item) => {
        let obj = {};
        obj.text = item
        obj.value = item
        array.push(obj)
    })
    return array
}

router.post('/ShowCategory', function(req, res, next) {
    CatalogueInformation.find({shopid: req.body.shopID}).exec((err, result) => {
        let categoryScroll = new Set();
        let productScroll = new Set();
        let brandScroll = new Set();
        let subcategoryScroll = new Set();
        let discountScroll = new Set();
        let priceScroll = new Set();
        //  console.log(result);
        result.forEach((item) => {
            categoryScroll.add(item.categoryid)
            //categoryScroll.push(item.categoryid);
            //productScroll.push(item.productid
            productScroll.add(item.productid)
            brandScroll.add(item.brandid)
            subcategoryScroll.add(item.subcategoryid)
            discountScroll.add(item.discount)
            priceScroll.add(item.price)
        })
        res.send({categoryScroll: pair(categoryScroll), productScroll: pair(productScroll), brandScroll: pair(brandScroll), subcategoryScroll: pair(subcategoryScroll), discountScroll: pair(discountScroll)})
        //console.log(subcategoryScroll)
    })
});
 // remove the product from the database of that particular shop
router.post('/delete', function(req, res) {
    CatalogueInformation.findByIdAndRemove({_id: req.body.id}).exec((err, result) => {
      if(err){
        res.send("Delete Fail")
      }
      else {
        res.send("Deleted Successfully")
      }
    })
})
// find and update a particular product in the shop
router.post('/update', function(req, res) {
  console.log(req.body)
    CatalogueInformation.findOne({_id: req.body.object.id}).exec((err, result) => {
      console.log(result)
            result.quantity=req.body.object.quantity;
             result.price = req.body.object.price;
            result.discount= req.body.object.discount;
             result.save((err,response)=>{
             if(err)
              {
                 res.send("Error")
             }
               else {
                res.send("Updated Successfully")
              }
             })
});
    })


module.exports = router;
