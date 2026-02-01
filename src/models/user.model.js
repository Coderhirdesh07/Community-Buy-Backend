const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
fullname:{
    type:String,
    require:true,
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
role:{
    type:String,
    enum:["Admin","Merchant","Buyer"],
    default:"Buyer",
},
// models for referals and orders
refered:{
    type:[],
}
},{timeStamps:true});


const User = mongoose.model('User',userSchema);
module.exports = User;