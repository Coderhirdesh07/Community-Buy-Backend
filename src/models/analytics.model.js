const mongoose = require("mongoose");
const {Schema} = mongoose;

const analyticsSchema = new mongoose.Schema({
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


const Analytics = mongoose.model('Analytics',analyticsSchema);
module.exports = Analytics;