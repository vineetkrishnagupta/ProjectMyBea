const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
    card_numder: {
        type: String,
        required: false,
        default: "Doon",
},
expiration_date: {
        type: String,
        required: false,
        default: "",
},
cvv: {
        type: String,
        required: false,
        default: "",
},

card_holder_name: {
    type: String,
    required: false,
    default: "",
},
    

    payment: {
        type: String,
        required: false,
        default: "",
},
user_id: {
        type: String,
        required: false,
        default: "",
},
user_email: {
        type: String,
        required: false,
        default: "",
},
for: {
    type: String,
    required: false,
    default: "",
},
    
  date: {  type: Date, 
    default : Date.now 
  }
  })
  

  var payment =  mongoose.model.paymentSchema || mongoose.model("payment", paymentSchema );

  module.exports = payment