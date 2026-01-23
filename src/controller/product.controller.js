const Product = require("../models/product.model.js");


async function handleProductRegistration(request,response){
    const {productname , productCategory ,
    productPrice , productImage } = request.body;
    if(!productname || !productCategory || !productPrice){
        return response.status(400).json({message:"Product Name or Product Category or price is missing"});
    }
    const newProduct = new Product({productname,productCategory,productPrice,productImage});
    await newProduct.save();
    return response.status(200).json({message:'New Product registered'});
}
async function handleProductDelete(request,response){}
async function handleProductUpdate(request,response){}
async function handleProductInfo(request,response){}


module.exports = {handleProductDelete,handleProductInfo,handleProductRegistration,handleProductUpdate};