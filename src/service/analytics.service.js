const Analytics = require("../models/analytics.model");
const User = require("../models/user.model");

async function getTotalUsers(){
    return await User.countDocuments();
}

async function getNewUsers() {
    return await Analytics.aggregate([
    { $match: { event: "USER_REGISTERED" } },
    {
        $group: {
            _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
            },
            count: { $sum: 1 }
        }
    },
    { $sort: { _id: 1 } }
]);
}

async function logins() {
   return await Analytics.aggregate([
    { $match: { event: "USER_LOGGED_IN" } },
    {
        $group: {
            _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
            },
            count: { $sum: 1 }
        }
    }
]);
}

async function getActiveUsers(){
   return await Analytics.distinct("userId",{
    event:"USER_LOGGED_IN",
    createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
   })
}

async function getAllProducts(){
    // here we need to return all products
}

async function getNoOfOrderRecieved(){
    // here we need to caluclate all orders recieved 

}


module.exports = { getAllProducts,getNoOfOrderRecieved,getActiveUsers,logins,getNewUsers,getTotalUsers};
