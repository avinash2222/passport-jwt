require('dotenv').config();
const jwt=require('jsonwebtoken');
const roleFetcher = require('../Authentication/roles');
// API authentication

// return role type
var returnRole = ((req) => {
  const token = req.header('auth-token');
  var decode = jwt.decode(token, process.env.JWT_SECRET);
  var role = decode.role;
  return role;
});

// check if permission set for the role
var checkGrantPermission = ((req, grants, role) => { 
  var keys = Object.keys(grants); //get keys from object as an array
  let found;
  keys.forEach(function(key) { //loop through keys array
    if (key === role){
      found = true; //role matched for the route
      return false; //to break the look
    }
    else return true;
  });
  return found;
});

module.exports={
  allowIfLoggedin: function(req, res, next) {
      const token=req.header('auth-token');
      if (!token) return res.status(401).send('You need to be logged in to access this route');
      try {
        const verified=jwt.verify(token, process.env.JWT_SECRET);
        req.user=verified;
        console.log(verified);
        next();
      } catch (err) {
          res.status(400).send('Invalid Token');
      }
  },

  //npm access control
  grantAccess: function(action, resource) {   
    return async (req, res, next) => {
      try { 
        var role = returnRole(req); //find user role from JWT token
        var roles = await roleFetcher.roles(); //extrating permission object for a role
  
        if (!checkGrantPermission(req, roles._grants, role)) 
          return res.status(400).send({message: "No permission exist for this role, please create permission first!"}); 
        
        const permission = roles.can(role)[action](resource); 

        req.permission = permission; //setting permission variable to use in other middle ware 
        if (!permission.granted) {
          return res.status(401).json({
          error: `${role} role don't have enough permission to perform this action`
          });
        }
        next();
      } catch (error) {
        next(error);

      }
    };
  },

  // use it for manual pujari authentication using jwt
  isPujari: function(req, res, next) {
    var role = returnRole(req);
    if (role == "pujari") next();
    else res.status(401).send(`'${role}' role not allowed to access the resource`);  
  },

  // use it for manual user authentication using jwt
  isUser: function(req, res, next) {
    var role = returnRole(req);
    if (role == "user") next();
    else res.status(401).send(`'${role}' role not allowed to access the resource`);
  },

  // use it for manual shopkeeper authentication using jwt
  isShopKeeper: function(req, res, next) {
    var role = returnRole(req);
    if (role == "shopkeeper") next();
    else res.status(401).send(`'${role}' role not allowed to access the resource`); 
  },

  // use it for manual admin authentication using jwt
  isAdmin: function(req, res, next) {
    var role = returnRole(req);
    if (role == "admin") next();
    else res.status(401).send(`'${role}' role not allowed to access the resource`);
  }
};



