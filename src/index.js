require("dotenv").config({path:'../.env'});
const express = require("express");
const app = express();
const connectToDb = require("./database/index.db.js");


connectToDb().then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started at 3000`);
    });
});