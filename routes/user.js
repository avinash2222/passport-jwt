var express = require('express');
var router = express.Router();
const verify=require('../Authentication/verifyToken');
var UserController = require('../controllers/user');
const User = require('../models/user');


// Create a new user
router.post('/register', User.hashPwd, UserController.createUser);

// Retrieve All users
router.get('/details', verify.allowIfLoggedin, verify.grantAccess('readAny', 'profile'), UserController.findAll);

// Retrieve a single user with phoneNumber
router.get('/:_id', verify.allowIfLoggedin, verify.grantAccess('readOwn', 'profile'), UserController.findOne);

// Update an user with phoneNumber
router.put('/:_id', verify.allowIfLoggedin, verify.grantAccess('updateOwn', 'profile'), UserController.update);

// Delete a user with phoneNumber
router.delete('/:_id', verify.allowIfLoggedin, verify.grantAccess('deleteOwn', 'profile'), UserController.delete);


module.exports = router;

//try theses access methods
// userController.grantAccess('readOwn', 'profile');
// userController.grantAccess('readAny', 'profile');
// userController.grantAccess('updateAny', 'profile');
// userController.grantAccess('deleteAny', 'profile');

//create indexing for faster search
// >>db.users.ensureIndex({'address.email':1});
