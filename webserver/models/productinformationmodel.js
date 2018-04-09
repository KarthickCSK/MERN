const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productInfoSchema = new Schema({
	productname: String,
	productdescription: String,
	productimg: Array,
	subcategoryid: {type: Schema.ObjectId, ref: 'subcategoryinfomodel'},
	productid: String,
	brandid: {type: Schema.ObjectId, ref: 'brandinfomodel'}
});
const productInformation = mongoose.model('productinfomodel', productInfoSchema);
module.exports = productInformation;

