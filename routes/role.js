var express = require('express');
var router = express.Router();
const verify=require('../Authentication/verifyToken');
var RoleController = require('../controllers/role');


// Create a new permission
router.put('/createPermission', verify.allowIfLoggedin, verify.isAdmin, RoleController.create);

// Retrieve All permission details
router.get('/getPermission', verify.allowIfLoggedin, verify.grantAccess('readAny', 'comment'), RoleController.findAll);

// Retrieve a particular type permissions
router.get('/getSimilarPermission', verify.allowIfLoggedin, verify.grantAccess('readAny', 'permission'),  RoleController.find);

// Update particular permission
router.put('/:_id', verify.allowIfLoggedin, verify.grantAccess('updateAny', 'comment'), RoleController.update);

// Delete partucular permission
router.delete('/:_id', verify.allowIfLoggedin, verify.grantAccess('deleteAny', 'permission'), RoleController.delete);

// change user role


module.exports = router;
