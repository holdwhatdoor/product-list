const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


mongoose.connect("mongodb://localhost/products", {
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

const PORT = process.env.PORT || 8000;
if(PORT == undefined || PORT == ""){
  PORT == 8000;
}

app.listen(PORT, () => {
});