const mongoose = require("mongoose");
const {Schema} = mongoose;

const analyticsSchema = new mongoose.model({
    event:{
        type:String,
        required:true
    },
    userId:{
      type:Schema.Types.ObjectId,
      ref:'User',
      default:null,
    },
    email:{
        type:String
    },
    ip: String,
    userAgent: String,
    createdAt:{
        type:Date,
        default:Date.now()
    }

});


const Analytics = mongoose.Schema('Analytics',analyticsSchema);
module.exports = Analytics;