const express = require("express");
const app = express();


const port = 3000;


// for read data from post request
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, () => {
  console.log("start server");
})

app.get("/", (req, res) => {
  res.send("This is home page");
})

app.get("/register", (req, res) => {
  let {name, password} = req.query;
  res.send(`welcome get user ${name}`);
})


app.post("/register", (req, res) => {
  let {name, password} = req.body;
  // console.log(req.body);
  res.send(`standard post response ${name}`);
})