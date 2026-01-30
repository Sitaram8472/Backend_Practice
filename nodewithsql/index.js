const { faker } = require("@faker-js/faker");
// Get the client
const mysql = require("mysql2");

// express
const express = require("express");
const app = express();

// method override
const methodoverride = require("method-override");
app.use(methodoverride("_method"));
app.use(express.urlencoded({ extended: true }));

// ejs for templating
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/view"));

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "Sitaram@2005",
});

// *---------------------------------------------------------------------------------------------------------------*

let q = "show tables";

// insert data into tables users
let q2 = "insert into users (id, username, email, password) values ?";
let data_q2 = [
  ["1001", "sitaram", "sitaramsahu@8472gmail.com", "1234"],
  ["1002", "himanhu", "himanshu@123gmail.com", "10022"],
];

let getrandomuser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// // get data form faker
// let data = [];
// let q3 = "insert into users (id, username, email, password) values ?";
// for (let i = 1; i <= 100; i++) {
//   data.push(getrandomuser());
// }

// try {
//   connection.query(q3, [data], (err, result) => {
//     if (err) {
//       throw err;
//     }
//     console.log(result);
//     console.log(result.length);
//   });
// } catch (err) {
//   console.log(err);
// }

// connection.end(); // for close connection

// get random data from faker
// let getrandomuser = () => {
//   return {
//     Id: faker.string.uuid(),
//     username: faker.internet.username(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//   };
// };
// console.log(getrandomuser());

// expresss

// home page route
app.get("/", (req, res) => {
  let q4 = "select count(*) from users";
  try {
    connection.query(q4, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("some err in database");
  }
  // res.send("welcome to home page");
});

// data fetch route
app.get("/user", (req, res) => {
  let q5 = "select * from users";
  try {
    connection.query(q5, (err, users) => {
      if (err) throw err;
      // console.log(result);
      // res.send(result);
      res.render("showuser.ejs", { users });
    });
  } catch (err) {
    console.log(err);
    res.send("some err in database");
  }
});

// edit from
app.get("/user/:id/editform", (req, res) => {
  let { id } = req.params;
  let q5 = `select * from users where id = '${id}'`;
  try {
    connection.query(q5, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("editform.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("some err in database");
  }
});

// UPADTE IN DATABASE FORM EDIT FORM
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formpassword, username: newusername } = req.body;
  let q5 = `select * from users where id = '${id}'`;
  try {
    connection.query(q5, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (formpassword != user.password) {
        res.send("wrong password");
      } else {
        let q6 = `update users set username='${newusername}' where id = '${id}'`;
        connection.query(q6, (err, result) => {
          if (err) {
            throw err;
          }
          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("some err in database");
  }
});

// add new user
app.get("/user/adduser", (req, res) => {
  res.render("adduser.ejs");
});

app.post("/user/adduser", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.send("Please fill in all details.");
  }

  const q7 = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

  connection.query(q7, [username, email, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err.message);
    }
    res.redirect("/user");
  });
});

// delete api
app.get("/user/delete/:id", (req, res) => {
  let { id } = req.params;
  res.render("delete.ejs", { id });
});

app.post("/user/delete", (req, res) => {
  const { email, password } = req.body;
  const q8 = "delete from users where email = ? and password = ?";
  connection.query(q8, [email, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("error in database");
    }
    if (result.affectedRows === 0) {
      return res.send("wrong email and password");
    }
    // res.send("uers successful deleted");
    res.redirect("/user");
  });
});

// server check
app.listen("8080", () => {
  console.log("server started");
});
