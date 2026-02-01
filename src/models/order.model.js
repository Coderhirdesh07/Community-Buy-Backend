const mongoose = require("mongoose");
const {Schema} = mongoose

const orderSchema = new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number,
        required:true
    },
});

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;