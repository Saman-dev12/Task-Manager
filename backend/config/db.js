const mongoose = require("mongoose");

const conn = () => {
  try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("MongoDB Connected...");
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
module.exports = conn;
