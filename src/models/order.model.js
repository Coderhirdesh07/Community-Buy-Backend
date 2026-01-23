const mongoose = require("mongoose");
const {Schema} = mongoose

const orderSchema = new mongoose.model({
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

const Order = mongoose.Schema('Order',orderSchema);
module.exports = Order;