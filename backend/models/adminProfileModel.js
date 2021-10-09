const mongoose = require('mongoose');
const adminProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

})
const adminProfileModel = mongoose.model('adminprofile', adminProfileSchema)
module.exports = adminProfileModel;