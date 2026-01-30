const express = require("express");
const app = express();

let port = 3000; // default 

app.listen(port, () => {
  console.log(`App is lsiten ${port}`);
})

// app.use((req, res) => {
//   console.log("request receive");
// })


// send response
// app.use((req, res) => {
//   // console.log(req);
//   console.log("response receive");

//   // by string
//   // res.send("This is first respone");

//   // by object
//   // res.send({
//   //   name: "Apple",
//   //   color: "red"
//   // })

//   // by html
//   let code = "<h1> fruits list</h1> <ul><li>apple</li><li>mango</li></ul/>"
//   res.send(code);
// })

app.get("/", (req, res) => {
  res.send("you are on root page index");
});

app.get("/about", (req, res) => {
  res.send("you are on about page");
});

app.get("/contact", (req, res) => {
  res.send("you are on contact page");
});

app.get("/:id/:name", (req, res) => {
  const { id, name } = req.params;
  res.send(`User ID: ${id}, Name: ${name}`);
});
