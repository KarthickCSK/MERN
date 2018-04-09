const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
const wishlistSchema = new Schema({
  username:String,
  brandid:String,
  categoryid:String,
  productid:String,
  productimg: Array,
  vendorid:String,
  category: String,
  product: String,
  size: String,
  price: String,
  discount:String,
  discountprice:String,
  expectedprice: String,
  description: String,
  pincode:String,
  shopname:String,
  shopurl:String,
  address:String,
  city:String,
  state:String,
});
const wishlistInformation = mongoose.model('wishlistinformation', wishlistSchema);
module.exports = wishlistInformation;

