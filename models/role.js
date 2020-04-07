require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var newSchema = new Schema({
  role : {
      type : String,
      required : true
  },
  action : {
    type : String
  },
  resource : {
    type : String
  },
  attributes : {
      type : String
  }
  },{
  timestamps : true
  }
);


module.exports = mongoose.model("Role", newSchema);