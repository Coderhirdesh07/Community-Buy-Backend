const {
  getActiveUsers,
  logins,
  getNewUsers,
  getTotalUsers
} = require("../service/analytics.service");

async function handleGetAdminAnalytics(req, res) {
  try {
    const [
      totalUsers,
      totalLogins,
      totalRegistrations
    ] = await Promise.all([
      getTotalUsers(),
      logins(),
      getNewUsers()
    ]);

    return res.status(200).json({
      totalUsers,
      totalLogins,
      totalRegistrations
    });
  } catch (error) {
    console.error("Analytics fetch failed:", error.message);
    return res.status(500).json({
      message: "Failed to fetch analytics"
    });
  }
}

module.exports = { handleGetAdminAnalytics };
