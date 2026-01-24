const {getActiveUsers,logins,getNewUsers,getTotalUsers} = require("../service/analytics.service");

async function handleGetAdminAnalytics(req, res) {
    const totalUsers = getTotalUsers();
    const totalLogins = logins();
    const totalRegistrations = getNewUsers();

    return res.json({
        totalUsers,
        totalLogins,
        totalRegistrations
    });
}


module.exports  = {handleGetAdminAnalytics};