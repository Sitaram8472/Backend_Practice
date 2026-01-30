const express = require("express");
const app = express();

let port = 3000; // default

app.listen(port, () => {
  console.log(`App is lsiten ${port}`);
});

// get method
app.get("/", (req, res) => {
  res.send("you are on home page");
});

app.get("/home", (req, res) => {
  res.send("you are on home page");
});

app.get("/about", (req, res) => {
  res.send("you are on about page");
});

app.get("/service", (req, res) => {
  res.send("you are on service page");
});

app.get("/contact", (req, res) => {
  res.send("you are on contact page");
});

// for error handling globally suppose any page not esit then show this message always
// app.use((req, res) => {
//   res.status(404).send("This path does not exist");
// });

// post

// app.post("/apple", (req, res) => {
//   res.send("you are on apple page");
// });

// app.post("/orange", (req, res) => {
//   res.send("you are on orange page");
// });

// params

// app.get("/:username", (req, res) => {
//   // console.log(req.params); // { username: 'sitaram' }
//   let username = req.params.username;
//   res.send(`I am username ${username}`);
// });

app.get("/:username/:id", (req, res) => {
  const { username, id } = req.params;
  let htmlstr = `<h1> welcome to tha page of ${username}</h1>`;
  // res.send(`User ID: ${id}, Name: ${username}`);
  res.send(htmlstr);
});

// query string

// app.get("/search", (req, res) => {
//   console.log(req.query);
//   res.send("you search by query");
// })

app.get("/search", (req, res) => {
  let { q } = req.query;
  if (!q) {
    res.send(`<h1> you dont search any query</h1>`);
  }
  let htmlq = `<h1> welcome to tha page of ${q}</h1>`;
  res.send(htmlq);
});
