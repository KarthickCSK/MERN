const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorInfoSchema = new Schema({
    firstname: String,
    lastname: String,
    email: { type: String, index: true, unique: true, required: true },
    username: { type: String, unique: true, required: true},
    password: String,
    isVendor: Boolean,
    gender: String,
    dob: Date,
    contactnumber: Number,
    vendorId: String,
    shops: [{ type: String, ref: 'vendorshopmodel'}]

});

const vendorInformation = mongoose.model('vendorinfomodel', vendorInfoSchema);
module.exports = vendorInformation;
