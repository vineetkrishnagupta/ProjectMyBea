const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String, 
    password: String,
    email: { 
        type: String, 
        required: true 
    },
    active: { 
        type: Boolean,
        default : false
    },
    date: {  type: Date, 
        default : Date.now 
    }
  })

  var User =  new mongoose.model("user", userSchema );

  module.exports = User