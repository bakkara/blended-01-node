require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const { PORT, DB_URI } = process.env;

(async () => {
  await mongoose.connect(DB_URI);
  console.log("Database connection was established");
  app.listen(PORT, () => {
    console.log("Server is up and running on port 3000");
  });
})();
