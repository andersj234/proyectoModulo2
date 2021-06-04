const express = require("express");
const mongodb = require("mongodb");
const bcrypt= require("bcrypt")
const app = express();
let MongoClient = mongodb.MongoClient;

let users = require("./users");
let compras = require("./compras")
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"))

app.use("/users", users);
app.use("/compras", compras);
MongoClient.connect(
  "mongodb://127.0.0.1:27017",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (error, client) {
    if (error !== null) {
      console.log(error);
    } else {
      app.locals.db = client.db("naik");
    }
  }
);

app.listen(3000);
