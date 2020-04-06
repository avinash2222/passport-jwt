var express = require('express');
var router = express.Router();
const verify=require('../Authentication/verifyToken');
var UserController = require('../controllers/users');
const User = require('../models/pujari');


// Create a new user
router.post('/register', User.hashPwd, UserController.create);

// Retrieve All users
router.get('/details', verify.allowIfLoggedin, verify.isUser, UserController.findAll);

// Retrieve a single user with phoneNumber
router.get('/:phoneNumber', verify.allowIfLoggedin,  UserController.findOne);

// Update an user with phoneNumber
router.put('/:phoneNumber', verify.allowIfLoggedin, UserController.update);

// Delete a user with phoneNumber
router.delete('/:phoneNumber', verify.allowIfLoggedin, UserController.delete);

//count Registered user
router.post('/count', verify.allowIfLoggedin, UserController.count);

module.exports = router;

//try theses access methods
// userController.grantAccess('readOwn', 'profile');
// userController.grantAccess('readAny', 'profile');
// userController.grantAccess('updateAny', 'profile');
// userController.grantAccess('deleteAny', 'profile');