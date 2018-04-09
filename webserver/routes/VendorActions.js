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
router.get('/', function(req, res) {
    res.send("hello vendor")
})

// route to add a new product by a vendor in catalogue specific to a
// vendor search is based on unique name of the shop in database
router.post('/SaveCatalogue', function(req, res) {
    //if the imageurl is coming null to the database then replace the product images
    //with the default images present in the database

    if (req.body.data.imageurl == '') {
        productInformation.findOne({productid: req.body.data.productName.toLowerCase()}).exec((err, result) => {
            req.body.data.imageurl = result.productimg;
        })
    }
    // if the images is coming from the userend then replace those images in the productmodel in the database
    if (req.body.data.imageurl.length > 0) {
        productInformation.findOne({productid: req.body.data.productName.toLowerCase()}).exec((err, result) => {
            result.productimg = req.body.data.imageurl;
            result.save();
        })
    }
    vendorShop.findOne({_id: req.body.data.shopObjectId}).exec((err, result) => {
        var AddNewCatalogue = new catalogueInformation({
            shopid: result._id,
            subcategoryid: req.body.data.subCategory,
            categoryid: req.body.data.category,
            brandid: req.body.data.brandName,
            productid: req.body.data.productName,
            discount: req.body.data.Discount,
            description: req.body.data.Description,
            quantity: req.body.data.quantity,
            price: req.body.data.MRP,
            productimg: req.body.data.imageurl
        });

        catalogueInformation.findOne({shopid: req.body.data.shopObjectId, subcategoryid: req.body.data.subCategory, categoryid: req.body.data.category, brandid: req.body.data.brandName}).exec((err, test) => {

            if (test) {

                res.send("Already Present");
            } else {
                    AddNewCatalogue.save((err, item) => {
                    result.catalogId.push(item._id);
                    result.save();
                    res.send("Add Successfull");
                })
            }
        })

    })
})
// add new category to the database
router.post('/AddNewCategory', function(req, res) {
  console.log(req.body.othercategory);
    categoryInformation.findOne({categoryid: req.body.othercategory.toLowerCase()}).exec((err, result) => {
        if (result) {
            console.log("already")
            res.send("Already Added")
        } else {
            let AddNewCategory = new categoryInformation({categoryname: req.body.othercategory, categoryid: req.body.othercategory.toLowerCase(),categoryimg:req.body.categoryimage})
            AddNewCategory.save((err, result) => {
              if(result)
              {
            console.log("Added Suucesfully")
            res.send("Added Successfully")
              }

            })
        }
    })
})
// router to add a new subcategory if not present in the database
router.post('/AddNewSubCategory', function(req, res) {
    categoryInformation.findOne({categoryid: req.body.category.toLowerCase()}).exec((err, result) => {
        subCategoryInformation.findOne({subcategoryid: req.body.othersubcategory.toLowerCase(), categoryid: result._id}).exec((err, product) => {
            if (product) {
                    res.send("Already Present")
            } else {
                let AddNewSubCategory = new subCategoryInformation({subcategoryname: req.body.othersubcategory, subcategoryid: req.body.othersubcategory.toLowerCase(),categoryid: result._id,subcategoryimg:req.body.subcategoryimageurl})
                AddNewSubCategory.save((err, user) => {
                    result.subcategoryid.push(user._id);
                    result.save("Added a new Subcategory")
                })
                res.send("Added A New Subcategory")
            }

        })
    })
})
// router to add a new Brand in the database if brand is not present
router.post('/AddNewBrand', function(req, res) {
    subCategoryInformation.findOne({subcategoryid: req.body.subcategory.toLowerCase()}).exec((err, result) => {
        brandInformation.findOne({brandname: req.body.otherbrandname, brandid: req.body.otherbrandname.toLowerCase(), subcategoryid: result._id}).exec((err, product) => {
            if (product) {
            } else {
                let AddNewBrand = new brandInformation({brandname: req.body.otherbrandname, brandid: req.body.otherbrandname.toLowerCase(), subcategoryid: result._id})
                let id = ''
                AddNewBrand.save((err, user) => {
                    id = user._id;
                    //  console.log(id)
                    result.brandid.push(id);
                    result.save();
                })
                res.send("Added A New Brand")
            }
        })
    })
})
// router to add a new product in the database if already not present
router.post('/AddNewProduct', function(req, res) {
    subCategoryInformation.findOne({subcategoryid: req.body.subcategory.toLowerCase()}).exec((err, test) => {
        brandInformation.findOne({brandid: req.body.brand.toLowerCase(),subcategoryid:test._id}).exec((err, result) => {
                  productInformation.findOne({productid: req.body.otherproductname.toLowerCase(), brandid: result._id, subcategoryid: test._id}).exec((err, product) => {
                if (product) {
                    res.send("Already Present")
                } else {
                    let AddNewProduct = new productInformation({productname: req.body.otherproductname, productid: req.body.otherproductname.toLowerCase(), brandid: result._id,productimg:req.body.productimage})
                    AddNewProduct.save((err, user) => {
                        //console.log(result)
                        result.productid.push(user._id);
                        result.save();
                        //  console.log("Added A new Product")
                    })
                    res.send("Added A New Product")
                }
            })

        })

    })
})
// return a array of key value pair for the dropdown menu
router.get('/ShowCategory', function(req, res, next) {
    categoryInformation.find({}).populate({path: 'subcategoryid'}).exec(function(err, result) {
        if (err) {
            res.send(err);
        } else {
            var categoryarray = [];
            result.forEach(function(item) {
                var obj = {};
                obj.text = item.categoryname;
                obj.value = item.categoryid
                categoryarray.push(obj);
            })
            //console.log(categoryarray);
            res.send(categoryarray);
        }
    });
});
// return a array of key value pair of subcategory for the dropdown menu
router.post('/ShowSubCategory', function(req, res, next) {
    categoryInformation.findOne({categoryid: req.body.category.toLowerCase()}).populate('subcategoryid').exec((err, result) => {
        if (err) {
            res.send(err)
        } else {
            var subcategoryarray = [];
            result.subcategoryid.forEach(function(item) {
                var obj = {};
                obj.text = item.subcategoryname;
                obj.value = item.subcategoryid;
                subcategoryarray.push(obj);
            })
            //    console.log(subcategoryarray);
            res.send(subcategoryarray);
        }
    })
});
// return a array of key  value brands pair for the dropdown menu
router.post('/showbrand', function(req, res, next) {
    //console.log(req.body.subcategory+"in here to add a new brand")
    subCategoryInformation.findOne({subcategoryid: req.body.subcategory.toLowerCase()}).populate('brandid').exec((err, result) => {

        let brandarray = [];
        if (err) {
            res.send(err)
        } else {
            result.brandid.forEach((brand) => {

                let obj = {};
                obj.text = brand.brandname;
                obj.value = brand.brandid
                brandarray.push(obj)
            })
            res.send(brandarray);
        }
    })
});
// return a array of key value pair of products for the dropdown menu
router.post('/showproduct', function(req, res, next) {
    //  console.log(req.body.brandname+" in show product")
    //console.log(req.body.subcategoryname+" in show product");
    subCategoryInformation.findOne({subcategoryid: req.body.subcategoryname.toLowerCase()}).exec((err, r) => {
        brandInformation.findOne({brandid: req.body.brandname.toLowerCase(), subcategoryid: r._id}).populate('productid').exec((err, result) => {
            //   console.log(result);
            let productarray = [];
            if (result) {
                result.productid.map((item) => {
                    let obj = {};
                    obj.text = item.productname;
                    obj.value = item.productid;
                    productarray.push(obj)
                })
                res.send(productarray)
            } else {
                let obj = {};
                obj.text = "Add A product";
                obj.value = "Add A Product";
                productarray.push(obj);
                res.send(productarray);
            }
        })
    })
});
module.exports = router;
