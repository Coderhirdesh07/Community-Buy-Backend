const express = require("express");
const app = express();
const userRouter  = require("./routes/auth.routes");
const productRouter = require("./routes/product.routes");
const orderRouter = require("./routes/order.routes");
const analyticsRouter = require("./routes/analytics.routes");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/product",productRouter);
app.use("/api/v1/order",orderRouter);

app.use("/api/v1/analytics",analyticsRouter);


module.exports = app;
