const User = require('../models/user');
const bcrypt = require('bcryptjs');
function commonLoginController(){

}

//Login
commonLoginController.prototype.login = (req, res) => {
  const {phone_number, password} = req.body;

  if (!phone_number || !password) return res.status(409).send({message: "Provide phone number and password"});
  
  User.findOne({phone_number})
  .then(user => {
      if(!user) {
        return res.status(404).send({message : "User doesn't exist"});
      } else { 
          bcrypt.compare(password, user.password).
          then(success => {
              if (!success) {
                res.status(401).send({message : "Wrong phone number or password"});
              } else {
                  const token = User.signToken(user);
                  res.header('auth-token', token);
                  res.status(200).send({"success" : true, "token" : token, "message" : `user successfully logged in`});
              }
          });  
      }
  }).catch(err => {
      console.error("userDetails not found", err.message);
      res.status(500).send({
          message: `Error:${err.message}`
      });
  });       
};

var commonLoginController = new commonLoginController();
module.exports = commonLoginController;





