require("dotenv").config();
// require("dotenv").config({path:'../.env'});
const app = require("./app.js");
const connectToDb = require("./database/index.db.js");


connectToDb().then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started at 3000`);
    });
});