const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categoryInfoSchema = new Schema({
	categoryname: String,
	categoryid: String,
	subcategoryid: [{type: Schema.ObjectId, ref: 'subcategoryinfomodel'}],
	categoryimg: Array
});

const categoryInformation = mongoose.model('categoryinfomodel', categoryInfoSchema);
module.exports = categoryInformation;
