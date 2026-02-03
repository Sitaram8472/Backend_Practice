const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

// app.use(() => {
//   console.log("i am a middleware");
// });

// check middlework how work
// app.get((req, res, next) => {
//   res.send("i am 1 middleware");
//   return next();
//   console.log("i am after middleware");
// });

// app.get((req, res, next) => {
//   res.send("i am  2 middleware");
//   console.log("i am after middleware");
// });

// utlitlty logger
// app.use((req, res, next) => {
//   req.time = Date.now;
//   console.log(req.method, req.hostname, req.path, req.time);
//   next();
// });

// api token
// app.use("/api", (req, res, next) => {
//   let { token } = req.query;
//   if (token === "giveaccess") {
//     next();
//   }
//   res.send("access denied");
// });

// app.get("/api", (req, res) => {
//   res.send("i am giev ypu access");
// });

// series of middlewares
let checktoken = (req, res, next) => {
  let { token } = req.query;
  if (token === "giveaccess") {
    next();
  }
  throw new ExpressError(401, "Access Denied");
};

app.get("/api", checktoken, (req, res) => {
  res.send("i am give you access");
});

// universe
app.get("/", (req, res) => {
  res.send("i am root");
});

app.get("/random", (req, res) => {
  res.send("i am random");
});

//  writing error handlers
app.get("/err", (req, res, next) => {
  abcd = abcd;
});

// activity
app.get("/admin", (req, res) => {
  throw new ExpressError(403, "Access to admin is forbidden");
});

app.use((err, req, res, next) => {
  // console.log("-------ERROR------");
  // next(err);
  // res.send(err);
  let { status, message } = err;
  res.status(status).send(message);
});

// custome error
app.use((err, req, res, next) => {
  let { status = 500, message = "access denied occour" } = err;
  res.status(status).send(message);
});

// app.use((err, req, res, next) => {
//   console.log("-------ERROR2------");
//   next(err);
// });

// not found page using middleware
app.use((req, res) => {
  res.status(404).send("Page not found!");
});

// universal
app.listen(8080, () => {
  console.log("server started");
});
