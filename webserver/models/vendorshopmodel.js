const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorInfoSchema = new Schema({
    shopname: {type:String, required:true},
	address: String,
    shopid:String,
	city: String,
    state: String,
    pincode: Number,
    country: String,
	contactnumber: Number,
    shopurl: String,
	lat: String,
	lng: String,
  shopimg: String,
    vendorid:{type:Schema.ObjectId, ref:'vendorinfomodel'},
    catalogId: [{type: Schema.ObjectId, ref: 'catalogueinfomodel'}]

});

const vendorInformation = mongoose.model('vendorshopmodel', vendorInfoSchema);
module.exports = vendorInformation;
