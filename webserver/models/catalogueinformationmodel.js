const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catalogueInfoSchema = new Schema({

	shopid:{type:Schema.ObjectId, ref:'vendorshopmodel'},

	vendorid: String,
	subcategoryid: String,
	categoryid: String,
	brandid: String,
	// products: Array
	productid: {type: String, ref: 'productinfomodel'},
	discount: String,
	price: Number,
	description: String,
	reviews:Array,
	questions:Array,
	quantity:Number,
	productimg:Array


});

const catalogueInformation = mongoose.model('catalogueinfomodel', catalogueInfoSchema);
module.exports = catalogueInformation;
