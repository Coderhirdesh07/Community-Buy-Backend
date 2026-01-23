const Analytics = require("../models/analytics.model");

async function logEvent({event,userId,email,request}){
    try{
        await Analytics.create({
            event:event,
            userId:userId,
            email:email,
            ip:request.ip,
            userAgent:request.headers["user-agent"]
        });
        
    }
    catch(error){
        console.log("Analytics failed:",error.message);
    }


}

module.exports = logEvent;