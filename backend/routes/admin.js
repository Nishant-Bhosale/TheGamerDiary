const express = require('express');
const adminHandler = require('../controllers/adminHandler');

const admin = express.Router();
admin.route('/api/admin').post(adminHandler);

module.exports = admin;