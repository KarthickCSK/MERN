var should = require("chai").should(),
assert = require ("chai").assert,
supertest = require("supertest"),
app = require("../../server.js");
let testing=require('./testdata.json');
var url = supertest("http://localhost:8080");


//auth testcases


describe("Signup route", function(err){
this.timeout(150000);
  it("should handle and login the registered user with correct credentials", function(done){
    url
        .post("/auth/signup")
        .send(testing.SignUp)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log(res.text)
          should.not.exist(err);
          done();
        });
  });
});

describe("login", function(err){
this.timeout(150000);
  it("login", function(done){
    url
        .get("/auth/login")
        .send(testing.Login)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log("success")
          should.not.exist(err);
          done();
        });
  });
});


//completed auth test cacses

//uploadimage.js
// describe("deletefromserver route", function(err){
//   this.timeout(15000)
//   it("should check the delete image from server", function(done){
//     url
//         .post("/uploadimage/deletefromserver")
//         .send({imagename:"IMG_1487006378224.png"})
//         .expect(200)
//         .expect('Content-Type', /text/)
//         .end(function(err, res){
//           console.log(res.text)
//           should.not.exist(err);
//           done();
//         });
//   });
// });
//
// describe("deletefromservercategory route", function(err){
//   this.timeout(15000)
//   it("should check the delete category image from server", function(done){
//     url
//         .post("/uploadimage/deletefromservercategory")
//         .send({imagename:"IMG_1487004911258.jpeg"})
//         .expect(200)
//         .expect('Content-Type', /text/)
//         .end(function(err, res){
//           console.log(res.text)
//           should.not.exist(err);
//           done();
//         });
//   });
// });
//
// describe("deletefromserversubcategory route", function(err){
//   this.timeout(15000)
//   it("should check the delete subcategory image from server", function(done){
//     url
//         .post("/uploadimage/deletefromserversubcategory")
//         .send({imagename:"IMG_1487004943547.jpeg"})
//         .expect(200)
//         .expect('Content-Type', /text/)
//         .end(function(err, res){
//           console.log(res.text)
//           should.not.exist(err);
//           done();
//         });
//   });
// });
//
// describe("deletefromservershop route", function(err){
//   this.timeout(15000)
//   it("should check the delete shop image from server", function(done){
//     url
//         .post("/uploadimage/deletefromservershop")
//         .send({imagename:"IMG_1487047247354.jpeg"})
//         .expect(200)
//         .expect('Content-Type', /text/)
//         .end(function(err, res){
//           console.log(res.text)
//           should.not.exist(err);
//           done();
//         });
//   });
// });

//accountVerification testcases
describe("verification link", function(err){
this.timeout(150000);
  it("mail verify", function(done){
    url
        .get("/aVerification/verify?id=pancCnFTsqJ1x5j3woE2eJZM4DcKgfoYVEPJfsOJOdatJZnrub5Op38E8W6faPma3qTApwvpaifgKXA6DIuKvw&email=50tYKGN90Qrtcu83HqhW6jO4DAX2RI7npo1dm9SuPastfCNph_FJ8ojOh2hKVY4LFQn3UpblB5dDc17tSgSdZn-S4KbfF8D3BrVL-xSbheE")
        .expect(302)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log("success")
          should.not.exist(err);
          done();
        });
  });
});//end of authverification test cases

describe("Mail verification", function(err){
this.timeout(150000);
  it("mail verify", function(done){
    url
        .post("/aVerification/mailVerify")
        .send(testing.Verification)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log("success")
          should.not.exist(err);
          done();
        });
  });
});

//categoryimages testcases
describe("uploadInDbcategory", function(err){
this.timeout(150000);
  it("should update user password", function(done){
    url
        .post("/categoryimage/uploadInDbcategory")
        .send(testing.Category)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log("success")
          should.not.exist(err);
          done();
        });
  });
});//end of categoryimage

//filterProducts testcases
describe("filterProducts", function(err){
this.timeout(150000);
  it("filter", function(done){
    url
        .post("/filterQuery/showFilteredProduct")
        .send(testing.Filter)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log("success")
          should.not.exist(err);
          done();
        });
  });
});//end of filterProducts


//forgotPassword testcases
describe("Forget Password", function(err){
this.timeout(150000);
  it("forget password", function(done){
    url
        .post("/fPassword/forgetPassword")
        .send(testing.ForgotPassword)
        .expect(302)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log("success")
          should.not.exist(err);
          done();
        });
  });
});
describe("new Password", function(err){
  this.timeout(150000);

  it("should new user password", function(done){
    url
        .get("/fPassword/newpassword?id=2PIi8qV39LKVtyMERYy40pSOPmhLey0XaalkqK8NAsRhmOkPl1VDyPBIpTg4YdQ42dv-Owt4ls7r3TrbbCdhnA&email=-NpYhl7Dp4Uo4nM6FU5CDhSlvPYi_1PfXMBcc_yx8GZNvgS-AfZRHD-Ojr0tEE9gVXqL8V6UGGFbpbGtC-zSFpjkWBzIWMR7qwGBxd0uMVE")
        .expect(302)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log("success")
          should.not.exist(err);
          done();
        });
  });

});
describe("Update Password", function(err){
  this.timeout(150000);

  it("should update user password", function(done){
    url
        .post("/fPassword/updatepassword")
        .send(testing.updatepassword)
        .expect(302)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log("success")
          should.not.exist(err);
          done();
        });
  });
});//end of ForgotPassword

//uploadedimage.js
describe("upload route", function(err){
  this.timeout(150000);
  it("should check the image uploaded ", function(done){
    url
        .post("/uploadimage/upload")
        .send(testing.upload)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log(res.json)
          should.not.exist(err);
          done();
        });
  });
});

describe("uploadInDb route", function(err){
  this.timeout(150000);

  it("should check the image uploaded in database", function(done){
    url
        .post("/uploadimage/uploadInDb")
        .send(testing.uploadInDb)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log(res.text)
          should.not.exist(err);
          done();
        });
  });
});

// describe("deletefromserver route", function(err){
//   this.timeout(15000)
//   it("should check the delete image from server", function(done){
//     url
//         .post("/uploadimage/deletefromserver")
//         .send({imagename:"IMG_146.png"})
//         .expect(200)
//         .expect('Content-Type', /text/)
//         .end(function(err, res){
//           console.log(res.text)
//           should.not.exist(err);
//           done();
//         });
//   });
// });
//
// describe("deletefromservercategory route", function(err){
//   this.timeout(15000)
//   it("should check the delete category image from server", function(done){
//     url
//         .post("/uploadimage/deletefromservercategory")
//         .send({imagename:"IMG_1486701244732.jpeg"})
//         .expect(200)
//         .expect('Content-Type', /text/)
//         .end(function(err, res){
//           console.log(res.text)
//           should.not.exist(err);
//           done();
//         });
//   });
// });
//
// describe("deletefromserversubcategory route", function(err){
//   this.timeout(15000)
//   it("should check the delete subcategory image from server", function(done){
//     url
//         .post("/uploadimage/deletefromserversubcategory")
//         .send({imagename:"IMG_1486701276095.jpeg"})
//         .expect(200)
//         .expect('Content-Type', /text/)
//         .end(function(err, res){
//           console.log(res.text)
//           should.not.exist(err);
//           done();
//         });
//   });
// });
//
// describe("deletefromservershop route", function(err){
//   this.timeout(15000)
//   it("should check the delete shop image from server", function(done){
//     url
//         .post("/uploadimage/deletefromservershop")
//         .send({imagename:"IMG_1486813096971.jpeg"})
//         .expect(200)
//         .expect('Content-Type', /text/)
//         .end(function(err, res){
//           console.log(res.text)
//           should.not.exist(err);
//           done();
//         });
//   });
// });


//testing for userAction route
describe("Addtowishlist route", function(err){
  this.timeout(15000);
  it("should add wishlist", function(done){
    url
        .post("/userAction/Addtowishlist")
        .send(testing.Addtowishlist)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log(res.json)
          should.not.exist(err);
          done();
        });
  });
});

//working
describe("checkwishlist route", function(err){
  this.timeout(15000);
  it("should check wish list products", function(done){
    url
        .post("/userAction/checkwishlist")
        .send(testing.checkwishlist)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log(res.json)
          should.not.exist(err);
          done();
        });
  });
});


describe("view wishlist username route", function(err){
  this.timeout(15000);
  it("should check wishlist username", function(done){
    url
        .post("/userAction/view")
        .send(testing.viewwishlist)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log(res.json)
          should.not.exist(err);
          done();
        });
  });
});


describe("update wishlist route", function(err){
  this.timeout(15000);
  it("should update wishlist", function(done){
    url
        .put("/userAction/update")
        .send(testing.updatewhislist)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log(res.text)
          should.not.exist(err);
          done();
        });
  });
});

describe("delete wishlist route", function(err){
  this.timeout(15000);
  it("should remove from wishlist", function(done){
    url
        .delete("/userAction/deletewishlist")
        .send(testing.deletewhislist)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log(res.json)
          should.not.exist(err);
          done();
        });
  });
});



describe("ShowCatalogue route", function(err){
  this.timeout(15000);

  it("should check the shopID", function(done){
    url
        .post("/userAction/showCatalogue")
        .send(testing.ShowCatalogue)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log(res.json)
          should.not.exist(err);
          done();
        });
  });
});

describe("ShowSubCategory route", function(err){

  this.timeout(15000);
  it("should check the catagoryid and shopID", function(done){
    url
        .post("/userAction/showSubCategory")
        .send(testing.showSubCategory)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log(res.json)
          should.not.exist(err);s
          done();
        });
  });
});

describe("ShowAllCatalogue route", function(err){
  this.timeout(15000);
  it("should check the catagoryid and shopID and subcategoryid", function(done){
    url
        .post("/userAction/showAllCatalogue")
        .send(testing.ShowAllCatalogue)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log(res.json)
          should.not.exist(err);
          done();
        });
  });
});

describe("ShowShops route", function(err){
  this.timeout(15000);
  it("should check the EmailID for Shops", function(done){
    url
        .post("/userAction/showShops")
        .send(testing.ShowShops)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log(res.json)
          should.not.exist(err);
          done();
        });
  });
});

describe("ShowProduct route", function(err){
  this.timeout(15000)
  it("should check the productID", function(done){
    url
        .post("/userAction/showProduct")
        .send(testing.ShowProduct)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log(res.json)
          should.not.exist(err);
          done();
        });
  });
});

describe("ShowProductList route", function(err){
  this.timeout(15000);
  it("should check the shopID and list products", function(done){
    url
        .post("/userAction/showProductList")
        .send(testing.ShowProductList)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log(res.json)
          should.not.exist(err);
          done();
        });
  });
});

describe("ShowAllProduct route", function(err){
  this.timeout(15000);
  it("should check all products", function(done){
    url
        .post("/userAction/showAllProduct")
        .send(testing.ShowAllProduct)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log(res.json)
          should.not.exist(err);
          done();
        });
  });
});
// describe("Addtowishlist route", function(err){
//   this.timeout(15000);
//   it("should add wishlist", function(done){
//     url
//         .post("/userAction/Addtowishlist")
//         .send({})
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .end(function(err, res){
//           console.log(res.json)
//           should.not.exist(err);
//           done();
//         });
//   });
// });
//
// describe("checkwishlist route", function(err){
//   this.timeout(15000);
//   it("should check wish list products", function(done){
//     url
//         .post("/userAction/checkwishlist")
//         .send({_id:""})
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .end(function(err, res){
//           console.log(res.json)
//           should.not.exist(err);
//           done();
//         });
//   });
// });
//
// describe("view wishlist username route", function(err){
//   this.timeout(15000);
//   it("should check wishlist username", function(done){
//     url
//         .post("/userAction/view")
//         .send({username:""})
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .end(function(err, res){
//           console.log(res.json)
//           should.not.exist(err);
//           done();
//         });
//   });
// });
//
// describe("update wishlist route", function(err){
//   this.timeout(15000);
//   it("should update wishlist", function(done){
//     url
//         .put("/userAction/update")
//         .send({product:"",expectedprice:""})
//         .expect(200)
//         .expect('Content-Type', /text/)
//         .end(function(err, res){
//           console.log(res.text)
//           should.not.exist(err);
//           done();
//         });
//   });
// });
//
// describe("delete wishlist route", function(err){
//   this.timeout(15000);
//   it("should remove from wishlist", function(done){
//     url
//         .delete("/userAction/deletewishlist")
//         .send({product:""})
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .end(function(err, res){
//           console.log(res.json)
//           should.not.exist(err);
//           done();
//         });
//   });
// });

describe("Addquestions route", function(err){
  this.timeout(15000);
  it("should check Addquestions", function(done){
    url
        .post("/userAction/addquestion")
        .send(testing.Addquestions)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log(res.text)
          should.not.exist(err);
          done();
        });
  });
});

describe("Addreviews route", function(err){
  this.timeout(15000);
  it("should check Addreviews", function(done){
    url
        .post("/userAction/addreviews")
        .send(testing.Addreviews)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log(res.text)
          should.not.exist(err);
          done();
        });
  });
});

//users.js
describe("CheckUsername route", function(err){
  this.timeout(15000);
  it("should check username", function(done){
    url
        .post("/users/checkUsername")
        .send(testing.CheckUsername)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log(res.json)
          should.not.exist(err);
          done();
        });
  });
});

describe("Checkmail route", function(err){
  this.timeout(15000);
  it("should check mail", function(done){
    url
        .post("/users/checkMail")
        .send(testing.Checkmail)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log(res.json)
          should.not.exist(err);
          done();
        });
  });
});

describe("CheckMailAtForgotPassword route", function(err){
  this.timeout(15000);
  it("should check mail at forgotPassword", function(done){
    url
        .post("/users/checkMailAtFPassword")
        .send(testing.CheckMailAtForgotPassword)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log(res.json)
          should.not.exist(err);
          done();
        });
  });
});

describe("logout route", function(err){
  this.timeout(15000);
  it("should check user is logged out or not", function(done){
    url
        .get("/users/logout")
        .send(testing.logout)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log(res.text)
          should.not.exist(err);
          done();
        });
  });
});

//VendorActions.js
describe("SaveCatalogue route", function(err){
  this.timeout(15000);
  it("should check SaveCatalogue in database ", function(done){
    url
        .post("/vendor/SaveCatalogue")
        .send(testing.SaveCatalogue)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log(res.text)
          should.not.exist(err);
          done();
        });
  });
});

describe("AddNewCategory route", function(err){
  this.timeout(15000);
  it("should check new category is present in database or not", function(done){
    url
        .post("/vendor/AddNewCategory")
        .send(testing.AddNewCategory)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log(res.text)
          should.not.exist(err);
          done();
        });
  });
});

describe("AddNewSubCategory route", function(err){
  this.timeout(15000);
  it("should check new subcategory is present in database or not", function(done){
    url
        .post("/vendor/AddNewSubCategory")
        .send(testing.AddNewSubCategory)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log(res.text)
          should.not.exist(err);
          done();
        });
  });
});

describe("AddNewBrand route", function(err){
  this.timeout(15000);
  it("should check new brand is present in database or not", function(done){
    url
        .post("/vendor/AddNewBrand")
        .send(testing.AddNewBrand )
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log(res.text)
          should.not.exist(err);
          done();
        });
  });
});

describe("AddNewProduct route", function(err){
  this.timeout(15000);
  it("should check new product is present in database or not", function(done){
    url
        .post("/vendor/AddNewProduct")
        .send(testing.AddNewProduct )
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log(res.text)
          should.not.exist(err);
          done();
        });
  });
});

describe("ShowCategory route", function(err){
  this.timeout(15000);
  it("should check category in dropdown menu in database or not", function(done){
    url
        .get("/vendor/ShowCategory")
        .send(testing.ShowCategory)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log(res.json)
          should.not.exist(err);
          done();
        });
  });
});

describe("ShowSubCategory route", function(err){
  this.timeout(15000);
  it("should check sub category in dropdown menu in database or not", function(done){
    url
        .post("/vendor/ShowSubCategory")
        .send(testing.ShowSubCategory)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log(res.json)
          should.not.exist(err);
          done();
        });
  });
});

describe("Showbrand route", function(err){
  this.timeout(15000);
  it("should check brand in dropdown menu in database or not", function(done){
    url
        .post("/vendor/showbrand")
        .send(testing.Showbrand)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log(res.json)
          should.not.exist(err);
          done();
        });
  });
});

describe("Showproduct route", function(err){
  this.timeout(15000);
  it("should check product in dropdown menu in database or not", function(done){
    url
        .post("/vendor/showproduct")
        .send(testing.Showproduct)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log(res.json)
          should.not.exist(err);
          done();
        });
  });
});


//subcateoryimage route testing
describe("subcateoryimage route", function(err){
  this.timeout(15000);
  it("saving subcategoryimage", function(done){
    url
        .post("/subcategoryimage/uploadInDbsubcategory")
        .send(testing.subcatg)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log("saved")
          should.not.exist(err);
          done();
        });
  });
});

//updatecatalogue route testing
describe("updatecatalogue route", function(err){
  this.timeout(15000);
  it("displaying catagory", function(done){
    url
        .post("/updatecatalogue/ShowCategory")
        .send(testing.shopid)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log("display-catagory")
          should.not.exist(err);
          done();
        });
  });
});

describe("updatecatalogue route", function(err){
  this.timeout(15000);
  it("deleting catagory", function(done){
    url
        .post("/updatecatalogue/delete")
        .send(testing.Id)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log("delete-catagory")
          should.not.exist(err);
          done();
        });
  });
});

describe("updatecatalogue route", function(err){
  this.timeout(15000);
  it("updating catagory", function(done){
    url
        .post("/updatecatalogue/update")
        .send(testing.Object)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log("update-catagory")
          should.not.exist(err);
          done();
        });
  });
});


//testing for updateuserprofile route
describe("updateuserprofile route", function(err){
  this.timeout(15000);
  it("checking password", function(done){
    url
        .post("/updateuserprofile/check")
        .send(testing.pass)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log("checked")
          should.not.exist(err);
          done();
        });
  });
});

describe("updateuserprofile route", function(err){
  this.timeout(15000);
  var email="dhivya695@gmail.com";
  it("update password", function(done){
    url
        .put("/updateuserprofile/updatepassword/gajunagaraj@gmail.com")
        .send(testing.newpass)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log("password updating")
          should.not.exist(err);
          done();
        });
  });
});

describe("updateuserprofile route", function(err){
  this.timeout(15000);
  it("inserting data", function(done){
    url
        .post("/updateuserprofile/insertdata")
        .send(testing.data)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          console.log("inserted")
          should.not.exist(err);
          done();
        });
  });
});

describe("updateuserprofile route", function(err){
  this.timeout(15000);
  it("updating user profile", function(done){
    url
        .put("/updateuserprofile/update")
        .send(testing.update_data)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log("update profile")
          should.not.exist(err);
          done();
        });
  });
});


// testing for saveShop
describe("SaveShop route", function(err){
  this.timeout(15000);
  it("should be able to add shops to database", function(done){
    url
        .post("/saveshop/viewshopdetail")
        .send(testing.saveShop)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log("Hello",res.json)
          should.not.exist(err);
          done();
       });
 });
});

describe("SaveShop route", function(err){
  this.timeout(15000);
  it("should be able to update shop details", function(done){
    url
        .post("/saveshop/updateshop")
        .send(testing.updateShop)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log("Hello",res.json)
          should.not.exist(err);
          done();
       });
 });
});


describe("logout", function(err){
this.timeout(150000);
  it("logout", function(done){
    url
        .get("/auth/logout")
        .send({})
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          console.log("success")
          should.not.exist(err);
          done();
        });
  });
});
