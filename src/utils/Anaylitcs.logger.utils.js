const Analytics = require("../models/analytics.model");

async function logEvent({ event, userId, email, request }) {
  try {
    await Analytics.create({
      event,
      userId,
      email,
      ip:
        request?.ip ||
        request?.headers?.["x-forwarded-for"] ||
        request?.socket?.remoteAddress ||
        "UNKNOWN",
      userAgent: request?.headers?.["user-agent"] || "UNKNOWN"
    });
  } catch (error) {
    console.log("Analytics failed:", error.message);
  }
}

module.exports = logEvent;