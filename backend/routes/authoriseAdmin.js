const express = require('express');
//Importing jwt verify middleware
const verify = require('../middleware/verifyMiddleware')
const adminAuthorisation = require('../controllers/adminAuthHandler');

const authoriseAdmin = express.Router();
authoriseAdmin.route('/api/authoriseAdmin').get(verify, adminAuthorisation);

module.exports = authoriseAdmin;