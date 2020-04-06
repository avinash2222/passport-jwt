require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

var address = new Schema({
    email : {
        type : String
    },
    phone_number : {
        type : Number
    },
    secondary_phone_number : {
        type : Number
    },
    state : {
        type : String
    },
    city : {
        type : String
    },
    pincode : {
        type : Number
    },
    locality : {
        type : String
    },
    landmark : {
        type : String
    },
    full_address : {
        type : String
    }
});


var newSchema = new Schema({
    userid : {
        type : String,
        required:true,
        unique : true
    },
    first_name : {
        type : String
    },
    last_name : {
        type : String,
        required : true
    }, 
    organisation : {
        type : String
    },
    sub_organisation : {
        type : String
    },
    notes : {
        type : String
    },
    active : {
        type : Boolean,
    },
    address : {address},
    password : {
        type : String,
        required : true
    },
    image : { 
        type : String,
        //required:true
    }
  },{
  timestamps : true
  },{
    versionKey: false
});

newSchema.statics.hashPwd = function (req, res, next) {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds)
    .then(function(hash) {
        req.body.password = hash;
        next();
    }).catch(err => {
        res.status(500).send({
            message: `Error:${err.message}`
            });
        });
};

newSchema.statics.signToken = newUser => {
    return JWT.sign({
        // role : newUser.role,
        // mobile : newUser.phoneNumber,
        userid : newUser.userid,
        iss : 'omniwyse',
        sub : newUser.id,
        iat : new Date().getTime(),
        exp : new Date().setDate(new Date().getDate()+1)
    },process.env.JWT_SECRET);
};



module.exports = mongoose.model("Pujari",newSchema);