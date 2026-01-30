const express = require("express"); // for server
const { request } = require("http");

const app = express();

const path = require("path"); // for folder inside folder

const port = 3000;

app.listen(port, () => {
  // check server start or not
  console.log(`your server start ${port}`);
});

// for templating
app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "/views")); // for folder inside folder


// or serving static files
// app.use(express.static("public")); // for serving static files only main folder
app.use(express.static(path.join(__dirname, "/public/css")));   // for serving static file form any where
app.use(express.static("/public/js")); // for serving static file form any where

app.get("/", (req, res) => {
  // by default page
  res.render("home.ejs");
});

app.get("/home", (req, res) => {
  // for home page
  res.send("home");
});

app.get("/rolldice", (req, res) => {
  let diceval = Math.floor(Math.random() * 6) + 1; // let assume this val coming form database
  res.render("rolldice.ejs", { num: diceval });
});

// app.get("/ig/:username", (req, res) => {  // for instagram clone page
//   let follwers = ["himanshu", "alice", "bob", "sonu"];
//   let {username} = req.params;
//   res.render("instagram.ejs", {username, follwers});
// });

app.get("/ig/:username", (req, res) => {
  // for cat instagram already data stroe in data.json
  let { username } = req.params;
  let instadata = require("./Data.json");
  const data = instadata[username];

  if (data) {
    res.render("instagramCat.ejs", { data });
  } else {
    res.render("error.ejs", { username });
  }
});