const mongoose = require("mongoose");
const {MONGO_URI}=require("../config/valuekeys");

const connectDB = () => {
    
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("mongoose connected");
};

module.exports = connectDB;
