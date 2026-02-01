const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productname:{
      type:String,
      require:true,
  },
  productCategory:{
      type:String,
      required:true,
  },
  productPrice:{
      type:String,
      required:true
  },
  productImage:{
      type:String,
  }
});


const Product = mongoose.model('Product',productSchema);
module.exports = Product;