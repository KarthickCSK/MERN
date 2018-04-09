const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandInfoSchema = new Schema({
	brandname: String,
	 brandid: String,
	subcategoryid: {type: Schema.ObjectId, ref: 'subcategoryinfomodel'},
	productid: [{type: Schema.ObjectId, ref: 'productinfomodel'}]
});

const brandInformation = mongoose.model('brandinfomodel', brandInfoSchema);
module.exports = brandInformation;

