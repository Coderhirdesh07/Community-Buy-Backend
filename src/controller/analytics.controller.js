const totalUsers = await User.countDocuments();

const newUsers = await Analytics.aggregate([
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


const logins = await Analytics.aggregate([
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


const activeUsers = await Analytics.distinct("userId", {
    event: "USER_LOGGED_IN",
    createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
});


async function getAdminAnalytics(req, res) {
    const totalUsers = await User.countDocuments();
    const totalLogins = await Analytics.countDocuments({ event: "USER_LOGGED_IN" });
    const totalRegistrations = await Analytics.countDocuments({ event: "USER_REGISTERED" });

    return res.json({
        totalUsers,
        totalLogins,
        totalRegistrations
    });
}
