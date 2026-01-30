const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js");
const methodoverrid = require("method-override"); 

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverrid("_method"));

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/delta_app");
}

// index route
app.get("/chats", async (req, res) => {
  let chats = await chat.find();
  // console.log(chats);
  res.render("index", { chats });
});

// newchat route
app.get("/chats/newchat", (req, res) => {
  res.render("newchat.ejs");
  // res.redirect("/chats");
});

// create route
app.post("/chats", (req, res) => {
  let { from, to, message } = req.body;
  let newchats = new chat({
    from: from,
    to: to,
    message: message,
    created_at: new Date(),
  });

  //  console.log(newchats);
  newchats
    .save()
    .then((res) => {
      console.log("save chat");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

// edit route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chats = await chat.findById(id);
  res.render("edit.ejs", { chats });
});

// update route
app.put("/chats/:id", async(req, res) => {
  let { id } = req.params;
  let {message: newmsg } = req.body;
  let updatechat = await chat.findByIdAndUpdate(id, { message: newmsg }, {runValidators: true, new: true});
  // console.log(updatechat);
  res.redirect("/chats");
});

// destroy route
app.delete("/chats/:id", async(req, res) => {
  let {id} = req.params;
  let deletedchat = await chat.findByIdAndDelete(id);
  res.redirect("/chats");
});

app.get("/", (req, res) => {
  res.send("root is working");
});

app.listen(8080, () => {
  console.log("server started");
});