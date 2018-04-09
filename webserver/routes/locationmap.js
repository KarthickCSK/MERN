'use strict';
const express = require('express');
const router = express.Router();
const subCategoryInformation = require('../models/subcategoryinformationmodel.js')
const categoryInformation = require('../models/categoryinformationmodel.js')
const brandInformation = require('../models/brandinformationmodel.js')
const productInformation = require('../models/productinformationmodel.js')
const user =require('../models/userinformationmodel.js')
const vendorInformation =require('../models/vendorshopmodel.js')


router.get('/getCategories', function(req, res, next) {
 categoryInformation.find({}).populate('').exec(function (err, story) {
  if (err) return err;
  res.send(story)
});
});

 router.get('/getAllData', function(req, res, next) {
  let data=[];
 categoryInformation.find({}).exec(function (err, story) {
  if (err) return err;
  story.map((item,index)=>{
    data.push(item.categoryid);
  })

  subCategoryInformation.find({}).exec(function (err, story) {
  if (err) return err;
  story.map((item,index)=>{
    data.push(item.subcategoryid);
  })

brandInformation.find({}).exec(function (err, story) {
  if (err) return err;
  story.map((item,index)=>{

    if(data.indexOf(item.brandid)  < 0){
      data.push(item.brandid);
    }


   })

  productInformation.find({}).exec(function (err, story) {
  if (err) return err;
  story.map((item,index)=>{
    data.push(item.productid);
  })
  res.send(data)
})

})

})

})
 });


router.post('/searchData', function(req, res, next) {
   vendorInformation.find({}).populate('catalogId').exec(function (err, story) {
  if (err) return err;
  var data=[];
  var max =0;
  story.map((content,i)=>{
    max =0;
    var temp={};
    temp.id=content._id;
    temp.lat=content.lat;
    temp.lng=content.lng;
    temp.name=content.shopname;
    temp.address=content.address;
    temp.shopimg=content.shopimg;
    temp.contactNo=content.contactnumber;
content.catalogId.map((item ,index)=>{
if(max <= item.discount){
  if( item.categoryid==req.body.data || item.subcategoryid==req.body.data || item.productid==req.body.data || item.brandid==req.body.data){
max=item.discount;
}
}
 })

if(max > 0){
  temp.maxDiscount=max;

data.push(temp);

}
  })
  res.send(data)
  //res.send(story)
});


});







router.get('/getVendors', function(req, res, next) {
 vendorInformation.find({}).populate('catalogId').exec(function (err, story) {
  if (err) return err;
  var data=[];
  var max =0;
  story.map((content,i)=>{
  	max =0;
  	var temp={};
  	temp.id=content._id;
  	temp.lat=content.lat;
  	temp.lng=content.lng;
  	temp.name=content.shopname;
  	temp.address=content.address;
    temp.shopimg=content.shopimg;
  	temp.contactNo=content.contactnumber;
content.catalogId.map((item ,index)=>{
if(max <= item.discount){
max=item.discount;
}
 })

if(max > 0){
  temp.maxDiscount=max;

data.push(temp);
}
  })
  res.send(data)
  //res.send(story)
});
});


router.post('/filterSubCategory', function(req, res, next) {
 vendorInformation.find({}).populate('catalogId').exec(function (err, story) {
 	if (err) return err;
  var data=[];
  var max =0;
  var filter=false;
  story.map((content,i)=>{
  	filter=false;
  	max =0;
  	var temp={};
  	temp.id=content._id;
  	temp.lat=content.lat;
  	temp.lng=content.lng;
  	temp.name=content.shopname;
  	temp.address=content.address;
     temp.shopimg=content.shopimg;
  	temp.contactNo=content.contactnumber;
content.catalogId.map((item ,index)=>{
if(max < item.discount){
max=item.discount;

}
if(item.categoryid === req.body.category){
if(item.subcategoryid ===req.body.subCategory){
filter=true;
}
}
 })
if(filter){
temp.maxDiscount=max;
data.push(temp);
}
  })
  res.send(data)
  //res.send(story)
});
});


router.post('/filterDiscount', function(req, res, next) {

  if((req.body.cat ) && (req.body.subCat )){
 vendorInformation.find({}).populate('catalogId').exec(function (err, story) {
 if (err) return err;
  var data=[];
  var max =0;
  story.map((content,i)=>{
    max =0;
    var temp={};
    temp.id=content._id;
    temp.lat=content.lat;
    temp.lng=content.lng;
    temp.name=content.shopname;
    temp.address=content.address;
     temp.shopimg=content.shopimg;
    temp.contactNo=content.contactnumber;
content.catalogId.map((item ,index)=>{
if(max < item.discount){
  if(item.categoryid === req.body.cat){
if(item.subcategoryid ===req.body.subCat){
max=item.discount;
}
}
}
 })
//if(item.categoryid === req.body.cat){
//if(item.subcategoryid ===req.body.subCat){
  if(max > 0){
temp.maxDiscount=max;
}

switch (req.body.discount) {
    case '40':
        if(parseInt(temp.maxDiscount) <= 40){
          data.push(temp);
        }
        break;
    case '45':
        if(parseInt(temp.maxDiscount) >= 40){
          if(parseInt(temp.maxDiscount) <= 50){
          data.push(temp);
        }
        }
        break;
    case '50':
        if(parseInt(temp.maxDiscount) > 50){
          data.push(temp);
        }
        break;
        }
      //}
   // }

  })
  res.send(data)
  //res.send(story)
});
}
else if(req.body.cat ){
vendorInformation.find({}).populate('catalogId').exec(function (err, story) {
 if (err) return err;
  var data=[];
  var max =0;
  story.map((content,i)=>{
    max =0;
    var temp={};
    temp.id=content._id;
    temp.lat=content.lat;
    temp.lng=content.lng;
    temp.name=content.shopname;
    temp.address=content.address;
     temp.shopimg=content.shopimg;
    temp.contactNo=content.contactnumber;
content.catalogId.map((item ,index)=>{
if(max < item.discount){
  if(item.categoryid === req.body.cat){
max=item.discount;
}
}
 })
//if(item.categoryid === req.body.cat){

temp.maxDiscount=max;



switch (req.body.discount) {
    case '40':
        if(parseInt(temp.maxDiscount) <= 40){
          data.push(temp);
        }
        break;
    case '45':
        if(parseInt(temp.maxDiscount) >= 40){
          if(parseInt(temp.maxDiscount) <= 50){
          data.push(temp);
        }
        }
        break;
    case '50':
        if(parseInt(temp.maxDiscount) > 50){
          data.push(temp);
        }
        break;
        }
      //}

  })
  res.send(data)
  //res.send(story)
});
}
else{
  vendorInformation.find({}).populate('catalogId').exec(function (err, story) {
 if (err) return err;
  var data=[];
  var max =0;
  story.map((content,i)=>{
    max =0;
    var temp={};
    temp.id=content._id;
    temp.lat=content.lat;
    temp.lng=content.lng;
    temp.name=content.shopname;
    temp.address=content.address;
     temp.shopimg=content.shopimg;
    temp.contactNo=content.contactnumber;
content.catalogId.map((item ,index)=>{
if(max < item.discount){
max=item.discount;
}
 })
temp.maxDiscount=max;
switch (req.body.discount) { case '40':
        if(parseInt(temp.maxDiscount) <= 40){
          data.push(temp);
        }
        break;
    case '45':
        if(parseInt(temp.maxDiscount) >= 40){
          if(parseInt(temp.maxDiscount) <= 50){
          data.push(temp);
        }
        }
        break;
    case '50':
        if(parseInt(temp.maxDiscount) > 50){
          data.push(temp);
        }
        break;
        }


  })
  res.send(data)
  //res.send(story)
});


}
});



router.post('/filterCategory', function(req, res, next) {
  var documents=[];
 vendorInformation.find({}).populate('catalogId').exec(function (err, story) {
  if (err) return err;
  var data=[];
  var max =0;
  var filter=false;
  if(story.length < 1){
    documents.push(data);
  }

 story.map((content,i)=>{
    filter=false;

   max =0;
    var temp={};
    temp.id=content._id;
    temp.lat=content.lat;
    temp.lng=content.lng;
    temp.name=content.shopname;
    temp.address=content.address;
     temp.shopimg=content.shopimg;
    temp.contactNo=content.contactnumber;
content.catalogId.map((item ,index)=>{

if(max < item.discount){
max=item.discount;

}
if(item.categoryid == req.body.data){

filter=true;

}
 })
if(filter){

temp.maxDiscount=max;
data.push(temp);


}
//console.log(documents);

});
  if(story.length >= 1){
  documents.push(data);
}

 categoryInformation.find({categoryid:req.body.data}).populate('subcategoryid').exec(function (err, story) {
  if (err) return err;
  documents.push(story);
  console.log(documents);
  res.send(documents)

});
  })

});



router.post('/filterComponentsByCategory', function(req, res, next) {
  var documents=[];
//req.user.local.email
 user.findOne({'local.email':req.user.local.email}).exec(function (err, response) {

  vendorInformation.find({vendorid:response._id}).populate('catalogId').exec(function (err, story) {

    if (err) return err;
  var data=[];
  var max =0;
  var filter=false;
  if(story.length < 1){
    documents.push(data);
  }

  story.map((content,i)=>{
    filter=false;

    max =0;
    var temp={};
    temp.id=content._id;
    temp.lat=content.lat;
    temp.lng=content.lng;
    temp.name=content.shopname;
    temp.address=content.address;
     temp.shopimg=content.shopimg;
    temp.contactNo=content.contactnumber;
content.catalogId.map((item ,index)=>{
if(max < item.discount){
max=item.discount;

}
if(item.categoryid == req.body.data){
filter=true;


}
 })
if(filter){

temp.maxDiscount=max;
data.push(temp);
//console.log(data);

}
//console.log(documents);

});
  if(story.length >= 1){

  documents.push(data);
}

  categoryInformation.find({categoryid:req.body.data}).populate('subcategoryid').exec(function (err, story) {
  if (err) return err;
  documents.push(story);
  console.log(documents);
  res.send(documents)
//res.send(story)
});
  })



})

});


router.post('/filterComponentsBySubCategory', function(req, res, next) {
  var documents=[];
//req.user.local.email
 user.findOne({'local.email':req.user.local.email}).exec(function (err, response) {

  vendorInformation.find({vendorid:response._id}).populate('catalogId').exec(function (err, story) {
  if (err) return err;
  var data=[];
  var max =0;
  var filter=false;
  story.map((content,i)=>{
    filter=false;
    max =0;
    var temp={};
    temp.id=content._id;
    temp.lat=content.lat;
    temp.lng=content.lng;
    temp.name=content.shopname;
    temp.address=content.address;
     temp.shopimg=content.shopimg;
    temp.contactNo=content.contactnumber;
content.catalogId.map((item ,index)=>{
if(max < item.discount){
max=item.discount;

}
if(item.categoryid === req.body.category){
if(item.subcategoryid ===req.body.subCategory){
filter=true;
}
}
 })
if(filter){
temp.maxDiscount=max;
data.push(temp);
}
  })
  res.send(data)
  //res.send(story)
});
});




})



router.get('/filterByVendors', function(req, res, next) {
  user.findOne({'local.email':req.user.local.email}).exec(function (err, response) {
 vendorInformation.find({vendorid:response._id}).populate('catalogId').exec(function (err, story) {
  if (err) return err;
  var data=[];
  var max =0;
  story.map((content,i)=>{
    max =0;
    var temp={};
    temp.id=content._id;
    temp.lat=content.lat;
    temp.lng=content.lng;
    temp.name=content.shopname;
    temp.address=content.address;
     temp.shopimg=content.shopimg;
    temp.contactNo=content.contactnumber;
content.catalogId.map((item ,index)=>{
if(max <= item.discount){
max=item.discount;
}
 })
temp.maxDiscount=max;
data.push(temp);
  })
  res.send(data)
  //res.send(story)
});
});
});


router.post('/filterByDiscount', function(req, res, next) {
   user.findOne({'local.email':req.user.local.email}).exec(function (err, response) {
    if((req.body.cat ) && (req.body.subCat )){
      vendorInformation.find({vendorid:response._id}).populate('catalogId').exec(function (err, story) {
      if (err) return err;
  var data=[];
  var max =0;
  story.map((content,i)=>{
    max =0;
    var temp={};
    temp.id=content._id;
    temp.lat=content.lat;
    temp.lng=content.lng;
    temp.name=content.shopname;
    temp.address=content.address;
     temp.shopimg=content.shopimg;
    temp.contactNo=content.contactnumber;
content.catalogId.map((item ,index)=>{
if(max < item.discount){
  if(item.categoryid === req.body.cat){
if(item.subcategoryid ===req.body.subCat){
max=item.discount;
}
}
}
 })
//if(item.categoryid === req.body.cat){
//if(item.subcategoryid ===req.body.subCat){
  if(max > 0){
temp.maxDiscount=max;
switch (req.body.discount) {
    case '40':
        if(parseInt(temp.maxDiscount) <= 40){
          data.push(temp);
        }
        break;
    case '45':
        if(parseInt(temp.maxDiscount) >= 40){
          if(parseInt(temp.maxDiscount) <= 50){
          data.push(temp);
        }
        }
        break;
    case '50':
        if(parseInt(temp.maxDiscount) > 50){
          data.push(temp);
        }
        break;
        }
}
  })
  res.send(data)
  //res.send(story)
});

    }
    else if(req.body.cat){
 vendorInformation.find({vendorid:response._id}).populate('catalogId').exec(function (err, story) {
      if (err) return err;
  var data=[];
  var max =0;
  story.map((content,i)=>{
    max =0;
    var temp={};
    temp.id=content._id;
    temp.lat=content.lat;
    temp.lng=content.lng;
    temp.name=content.shopname;
    temp.address=content.address;
     temp.shopimg=content.shopimg;
    temp.contactNo=content.contactnumber;
content.catalogId.map((item ,index)=>{
if(max < item.discount){
  if(item.categoryid === req.body.cat){

max=item.discount;

}
}
 })
//if(item.categoryid === req.body.cat){
//if(item.subcategoryid ===req.body.subCat){
  if(max > 0){
temp.maxDiscount=max;
switch (req.body.discount) {
    case '40':
        if(parseInt(temp.maxDiscount) <= 40){
          data.push(temp);
        }
        break;
    case '45':
        if(parseInt(temp.maxDiscount) >= 40){
          if(parseInt(temp.maxDiscount) <= 50){
          data.push(temp);
        }
        }
        break;
    case '50':
        if(parseInt(temp.maxDiscount) > 50){
          data.push(temp);
        }
        break;
        }
}
  })
  res.send(data)
  //res.send(story)
});
    }
    else{
 vendorInformation.find({vendorid:response._id}).populate('catalogId').exec(function (err, story) {
 if (err) return err;
  var data=[];
  var max =0;
  story.map((content,i)=>{
    max =0;
    var temp={};
    temp.id=content._id;
    temp.lat=content.lat;
    temp.lng=content.lng;
    temp.name=content.shopname;
    temp.address=content.address;
     temp.shopimg=content.shopimg;
    temp.contactNo=content.contactnumber;
content.catalogId.map((item ,index)=>{
if(max < item.discount){
max=item.discount;
}
 })
temp.maxDiscount=max;
switch (req.body.discount) {
    case '40':
        if(parseInt(temp.maxDiscount) <= 40){
          data.push(temp);
        }
        break;
    case '45':
        if(parseInt(temp.maxDiscount) >= 40){
          if(parseInt(temp.maxDiscount) <= 50){
          data.push(temp);
        }
        }
        break;
    case '50':
        if(parseInt(temp.maxDiscount) > 50){
          data.push(temp);
        }
        break;
        }

  })
  res.send(data)
  //res.send(story)
});
}
});
   });


module.exports = router;
