const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// cors support
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const mainRoutes = require("./routes/main");

app.use(mainRoutes);

// const PORT = process.env.PORT;
const PORT = 8000;
console.log("port")
console.log(PORT)
if(PORT == undefined || PORT == ""){
  PORT == 8000;
}
console.log("port: ")
console.log(PORT)
// let port = 8000;

app.listen(PORT, () => {
  console.log("Node.js listening on port " + PORT);
});