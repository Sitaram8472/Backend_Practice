// for express js
const express = require("express");
const app = express();
const port = 3000;

// for understand express all data form api even in json format or normal
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for crete new id or unique id ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
const { v4: uuidv4 } = require("uuid");

// for ejs
const path = require("path");
app.set("view engine", "ejs");
// for views folder
app.set("views", path.join(__dirname, "views"));
// for public folder
app.use(express.static(path.join(__dirname, "public/css")));

// overide package to update post
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// after all setup start woking

// for all posts
let posts = [
  {
    id: uuidv4(),
    username: "apnecpllege",
    content: "i am study form apnacollge",
  },
  {
    id: uuidv4(),
    username: "sitaram",
    content: "i am study form jis college of engineering",
  },
  {
    id: uuidv4(),
    username: "shraddha",
    content: "i am a teacher",
  },
];


// by default set when no any paramter pass 
app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

// display all post
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// for take input form newuser in newpostejs file
app.get("/posts/newpost", (req, res) => {
  res.render("newpost.ejs");
});

//this post method add in posts array of new user details
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  // res.send("your incoming post working"); // for checking working or  not
  res.redirect("/posts");
});

// access post by id even anything thing form which we want just change parameter
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  if (!post) {
    return res.render("Notfound.ejs", { post });
  }
  res.render("showpage.ejs", { post });
});

// to update any specific post using patch method
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newcontent = req.body.content;
  let post = posts.find((p) => id === p.id);
  if (!post) {
    return res.status(404).send({ error: "Post not found" });
  }
  post.content = newcontent;
  console.log(newcontent);
  // res.send("your patch method woking");
  res.redirect("/posts");
});

// for edit any specific post
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

// for delete specific post
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  // res.send("delete success");
  res.redirect("/posts");
});

// for check server start or not
app.listen(port, () => {
  console.log("Server start port 3000");
});
