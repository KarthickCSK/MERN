var express = require('express');
var router = express.Router();
const subCategoryInformation = require('../models/subcategoryinformationmodel.js')
const categoryInformation = require('../models/categoryinformationmodel.js')
const brandInformation = require('../models/brandinformationmodel.js')
const productInformation = require('../models/productinformationmodel.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hello index");
});

router.get('/populate', function(req,res){
//Electronics
	var AddNewCategory =  new categoryInformation({categoryname:'Electronics', categoryid:'electronics'});
	AddNewCategory.save((err,data)=>{
  	if(err){console.log(err)}
  	})
    var temp=['Mobiles','Tablets','TV','Refrigerators'];
    var brand=[['Apple','Samsung','OnePlus'],['Apple','Samsung'],['Samsung','Sony'],['Samsung','LG']];
    var product=[[[{'productname':'Iphone7','productdescription':'good phone','productimg':'image','productid':'Iphone7'.toLowerCase()},
    					{'productname':'Iphone6','productdescription':'good phone','productimg':'image','productid':'Iphone6'.toLowerCase()},
    					{'productname':'Iphone7 plus','productdescription':'good phone','productimg':'image','productid':'Iphone7 plus'.toLowerCase()},
    					{'productname':'Iphone6 plus','productdescription':'good phone','productimg':'image','productid':'Iphone6 plus'.toLowerCase()}],
    			[{'productname':'Galaxy S7','productdescription':'good phone','productimg':'image','productid':'Galaxy S7'.toLowerCase()},
    					 {'productname':'Galaxy S7 Edge','productdescription':'good phone','productimg':'image','productid':'Galaxy S7 Edge'.toLowerCase()}],
    			[{'productname':'OnePlus 3','productdescription':'good phone','productimg':'image','productid':'OnePlus 3'.toLowerCase()},
    					 {'productname':'OnePlus 3T','productdescription':'good phone','productimg':'image','productid':'OnePlus 3T'.toLowerCase()}],
    			],
    			[[{'productname':'Ipad Pro','productdescription':'good tablet','productimg':'image','productid':'Ipad Pro'.toLowerCase()},
    					{'productname':'Ipad mini','productdescription':'good tablet','productimg':'image','productid':'Ipad mini'.toLowerCase()}
    					],
    			[{'productname':'Galaxy Tab S2','productdescription':'good tablet','productimg':'image','productid':'Galaxy Tab S2'.toLowerCase()},
    					 {'productname':'Galaxy J Max','productdescription':'good tablet','productimg':'image','productid':'Galaxy J Max'.toLowerCase()}],

    			],
    			[[{'productname':'Oled Led smart TV','productdescription':'good tv','productimg':'image','productid':'Oled Led smart TV'.toLowerCase()}],

    			[{'productname':'Qled Led 4k TV','productdescription':'good tv','productimg':'image','productid':'Qled Led 4k TV'.toLowerCase()},
    					],

    			],
    			[[{'productname':'Side by Side 826l','productdescription':'good refrigerators','productimg':'image','productid':'Side by Side 826l'.toLowerCase()},
    					{'productname':'Frech Side 620l','productdescription':'good refrigerators','productimg':'image','productid':'Frech Side 620l'.toLowerCase()}
    					],
    			[{'productname':'Frost free 600l','productdescription':'good refrigerators','productimg':'image','productid':'Frost free 600l'.toLowerCase()}
    					 ],

    			]
    			];

  var AddNewSubCategory={};
  var AddNewBrandInformation={};
  var AddNewProductInformation={};
  var AddNewSubCategory={};
    temp.map((item,index)=>{
      AddNewSubCategory=new subCategoryInformation({subcategoryname:item ,subcategoryid:item.toLowerCase(), categoryid:AddNewCategory._id })
      AddNewSubCategory.save()
      AddNewCategory.subcategoryid.push(AddNewSubCategory._id);
      AddNewCategory.save()
      brand[index].map((b,subIndex)=>{
      	AddNewBrandInformation=new brandInformation({brandname:b,brandid:b.toLowerCase(),subcategoryid:AddNewSubCategory._id})
      	AddNewBrandInformation.save()
      	AddNewSubCategory.brandid.push(AddNewBrandInformation._id)
      	AddNewSubCategory.save()

      	var category=product[index];

      	category[subIndex].map((content)=>{
      		AddNewProductInformation=new productInformation({productname:content.productname,productdescription:content.productdescription,
      												   productimg:content.productimg,productid:content.productid,
      												   subcategoryid:AddNewSubCategory._id,
      												   brandid:AddNewBrandInformation._id})
      		AddNewProductInformation.save()
      		AddNewBrandInformation.productid.push(AddNewProductInformation._id)
      		AddNewBrandInformation.save()
      	})
      })


    })
//Men
var AddNewCategory =  new categoryInformation({categoryname:'Men', categoryid:'men'});
AddNewCategory.save((err,data)=>{
  if(err){console.log(err)}
  })
    var temp=['Clothing','Watches','Footwear']
    var brand=[['Levis','Wrangler','Lee'],['Casio','Fastrack'],['Nike','Puma','Addidas']];
    var product=[[[{'productname':'Levis men blue shirt','productdescription':'good shirt','productimg':'image','productid':'Levis men blue shirt'.toLowerCase()},
    					{'productname':'Levis men grey shirt','productdescription':'good shirt','productimg':'image','productid':'Levis men grey shirt'.toLowerCase()},
    					{'productname':'Levis men black shirt','productdescription':'good shirt','productimg':'image','productid':'Levis men black shirt'.toLowerCase()},
    					{'productname':'Levis men red shirt','productdescription':'good shirt','productimg':'image','productid':'Levis men red shirt'.toLowerCase()},
    					{'productname':'Levis men jeans','productdescription':'good jeans','productimg':'image','productid':'Levis men jeans'.toLowerCase()},
    					{'productname':'Levis men black jeans','productdescription':'good jeans','productimg':'image','productid':'Levis men black jeans'.toLowerCase()},
    					{'productname':'Levis men blue jeans slimfit','productdescription':'good jeans','productimg':'image','productid':'Levis men blue jeans slimfit'.toLowerCase()},
    					{'productname':'Levis men shaded jeans','productdescription':'good jeans','productimg':'image','productid':'Levis men shaded jeans'.toLowerCase()},
    					{'productname':'Levis men torn jeans','productdescription':'good jeans','productimg':'image','productid':'Levis men torn jeans'.toLowerCase()},
    					{'productname':'Levis men denim shirt','productdescription':'good shirt','productimg':'image','productid':'Levis men denim shirt'.toLowerCase()},
    					{'productname':'Levis men rugged jeans','productdescription':'good jeans','productimg':'image','productid':'Levis men rugged jeans'.toLowerCase()},
    					],
    			[{'productname':'Wrangler men red shirt','productdescription':'good shirt','productimg':'image','productid':'Wrangler men red shirt'.toLowerCase()},
    					 {'productname':'Wrangler men blue jeans','productdescription':'good jeans','productimg':'image','productid':'Wrangler men blue jeans'.toLowerCase()}],
    			[{'productname':'Lee men black shirt','productdescription':'good shirt','productimg':'image','productid':'Lee men black shirt'.toLowerCase()},
    					 {'productname':'Lee men jeans slimfit','productdescription':'good jeans','productimg':'image','productid':'Lee men jeans slimfit'.toLowerCase()}],
    			],
    			[[{'productname':'Casio Enticer','productdescription':'good watch','productimg':'image','productid':'Casio Enticer'.toLowerCase()},
    					{'productname':'Casio G-Shock','productdescription':'good watch','productimg':'image','productid':'Casio G-Shock'.toLowerCase()}
    					],
    			[{'productname':'Fastrack mens digital','productdescription':'good watch','productimg':'image','productid':'Fastrack mens digital'.toLowerCase()},
    					 {'productname':'Fastrack mens analog','productdescription':'good watch','productimg':'image','productid':'Fastrack mens analog'.toLowerCase()}],

    			],
    			[[{'productname':'Nike Airmax','productdescription':'good shoes','productimg':'image','productid':'Nike Airmax'.toLowerCase()}],

    			[{'productname':'Puma running','productdescription':'good shoes','productimg':'image','productid':'Puma running'.toLowerCase()},
    					],
    			[{'productname':'Addidas training','productdescription':'good shoes','productimg':'image','productid':'Addidas training'.toLowerCase()}]

    			]

    			];

  var AddNewSubCategory={};
  var AddNewBrandInformation={};
  var AddNewProductInformation={};
  var AddNewSubCategory={};
    temp.map((item,index)=>{
      AddNewSubCategory=new subCategoryInformation({subcategoryname:item ,subcategoryid:item.toLowerCase(), categoryid:AddNewCategory._id })
      AddNewSubCategory.save()
      AddNewCategory.subcategoryid.push(AddNewSubCategory._id);
      AddNewCategory.save()
      brand[index].map((b,subIndex)=>{
      	AddNewBrandInformation=new brandInformation({brandname:b,brandid:b.toLowerCase(),subcategoryid:AddNewSubCategory._id})
      	AddNewBrandInformation.save()
      	AddNewSubCategory.brandid.push(AddNewBrandInformation._id)
      	AddNewSubCategory.save()

      	var category=product[index];

      	category[subIndex].map((content)=>{
      		AddNewProductInformation=new productInformation({productname:content.productname,productdescription:content.productdescription,
      												   productimg:content.productimg,productid:content.productid,
      												   subcategoryid:AddNewSubCategory._id,
      												   brandid:AddNewBrandInformation._id})
      		AddNewProductInformation.save()
      		AddNewBrandInformation.productid.push(AddNewProductInformation._id)
      		AddNewBrandInformation.save()
      	})
      })


    })

  res.send('saved');

})



router.get('/show', function(req, res, next) {
 categoryInformation.find({}).populate({path :'subcategoryid' }).exec(function (err, story) {
  if (err) return handleError(err);
  //res.send(story);
  res.send(story)
  // prints "The creator is Aaron"
});
});

router.get('/showsub', function(req, res, next) {
 subCategoryInformation.find({}).populate('brandid ').exec((err,data)=>{
  	res.send(data)
  })


});

router.get('/showbrand', function(req, res, next) {
 brandInformation.find({}).populate('productid').exec((err,data)=>{
  	res.send(data)
  })


});
router.get('/showproduct', function(req, res, next) {
 productInformation.find({}).skip(5).limit( 5 ).populate(' ').exec((err,data)=>{
  	res.send(data)
  })



});

router.get('/getCategories', function(req, res, next) {
 categoryInformation.find({}).populate('').exec(function (err, story) {
  if (err) return handleError(err);
  //res.send(story);
  res.send(story)
  // prints "The creator is Aaron"
});
});

module.exports = router;
