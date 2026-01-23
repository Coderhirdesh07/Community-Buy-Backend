const express = require("express");
const app = express();
const userRouter  = require("./routes/auth.routes");
const productRouter = require("./routes/product.routes");
const { json } = require("node:stream/consumers");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/product",productRouter);

