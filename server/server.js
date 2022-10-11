const connectDB = require("./DbConfig/db");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");

connectDB();

//require models

require("./models/wallet");
require("./models/transaction");


app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/client/build')));
 

if (process.env.Node_ENV === "production") {
  console.log("added...");
  
  app.use('/', express.static(path.join(__dirname, '/client/build')));
 
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}


//app.use require routes

app.use(require("./routes/transaction"));
app.use(require("./routes/wallet"));



const server = app.listen(port, () => {
  console.log("Server is running on port : ", port);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`logged error : ${err}`);
  server.close(() => process.exit(1));
});
