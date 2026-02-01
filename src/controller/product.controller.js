const Product = require("../models/product.model.js");


async function handleProductRegistration(request,response){
    const {productname , productCategory ,
    productPrice , productImage } = request.body;
    if(!productname || !productCategory || !productPrice){
        return response.status(400).json({message:"Product Name or Product Category or price is missing"});
    }
    const newProduct = await Product.create({productname,productCategory,productPrice,productImage});
    return response.status(200).json({message:'New Product registered',data:newProduct});
}
async function handleProductDelete(request,response){
    const {productId} = request.body;
    if(!productId) return response.status(400).json({message:"Product id does not exist"});

    await Product.findByIdAndDelete({productId});
    return response.status(200).json({message:"Product deleted success"});

}
async function handleProductUpdate(request,response){}
async function handleProductInfo(request,response){
    const {productId} = request.body;
    if(!productId) return response.status(400).json({message:"Product id is missing"});

    const isProductExist = await Product.findById({productId});
    if(!isProductExist) return response.status(400).json({message:`Product with ${productId} does not exist`});

    return response.status(200).json({message:"Product fetched success",data:isProductExist});
}


module.exports = { 
    handleProductDelete,
    handleProductInfo,
    handleProductRegistration,
    handleProductUpdate
};