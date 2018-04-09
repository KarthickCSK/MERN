const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategoryInfoSchema = new Schema({
	subcategoryname: String,
	subcategoryid: String,
	categoryid: {type: Schema.ObjectId, ref: 'categoryinfomodel'},
	brandid: [{type: Schema.ObjectId, ref: 'brandinfomodel'}],
	subcategoryimg: Array
});

const subCategoryInformation = mongoose.model('subcategoryinfomodel', subCategoryInfoSchema);
module.exports = subCategoryInformation;
