const express = require('express');
//Importing jwt verify middleware
const verify = require('../middleware/verify')
const adminAuthorisation = require('../controllers/adminAuthorisation');

const authoriseAdmin = express.Router();
authoriseAdmin.route('/api/authoriseAdmin').get(verify, adminAuthorisation);

module.exports = authoriseAdmin;