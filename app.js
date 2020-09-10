//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const md5 = require("md5");


//connect to MongoDBAtlas
mongoose.connect(
  "mongodb+srv://" + process.env.DB_USER + ":"+ process.env.DB_PASSWORD +"@" + process.env.DB_TABLE ,
  {
    useNewUrlParser: true,
  }
);


// mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser: true} );
//create user schema

const userSchema = new mongoose.Schema ({
  email: String,
  password: String
});

//encrypting user password through mongoose-encryption

//userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ["password"] });

//create user model

const User = new mongoose.model("User", userSchema);


const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});


//Log in users with POST request

app.post("/login", function(req,res){
  const username = req.body.username;
  const password = md5(req.body.password);

  User.findOne({email: username}, function(err, foundUser){
    if (err) {
      console.log(err);
    }else {
      if (foundUser) {
        if (foundUser.password === password){
          res.render("secrets");
        }
      }
    }
  });
});

app.get("/register", function (req, res) {
  res.render("register");
});

//registering new users with a post request

app.post("/register", function(req, res){

  const newUser = new User ({
    email: req.body.username,
    password: md5(req.body.password)
  });
newUser.save(function(err){
  if(err){
    console.log(err);
  }else {res.render("secrets");
}
});
});



app.listen(3000 || process.end.PORT, function () {
  console.log("Server started successfully");
});


