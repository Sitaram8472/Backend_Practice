const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js");
const methodoverrid = require("method-override");
const ExpressError = require("./ExpressError");

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
  // await mongoose.connect("mongodb://127.0.0.1:27017/delta_app");
  await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}

// index route
app.get(
  "/chats",
  asuncWrap(async (req, res) => {
    try {
      let chats = await chat.find();
      // console.log(chats);
      res.render("index.ejs", { chats });
    } catch (err) {
      next(err);
    }
  }),
);

// newchat route
app.get("/chats/newchat", (req, res) => {
  // throw new ExpressError(404, "page not found");
  res.render("newchat.ejs");
  // res.redirect("/chats");
});

// create route
app.post(
  "/chats",
  asuncWrap(async (req, res, next) => {
    let { from, to, message } = req.body;
    let newchats = new chat({
      from: from,
      to: to,
      message: message,
      created_at: new Date(),
    });
    await newchats.save();
    res.redirect("/chats");

    //  console.log(newchats);
    // newchats
    //   .save()
    //   .then((res) => {
    //     console.log("save chat");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // res.redirect("/chats");
  }),
);

// asyncwarp function
function asuncWrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => {
      next(err);
    });
  };
}

// show routr for error handler async
app.get(
  "/chats/:id",
  asuncWrap(async (req, res, next) => {
    let { id } = req.params;
    let chats = await chat.findById(id);
    if (!chats) {
      next(new ExpressError(500, "chat not found"));
    }
    res.render("edit.ejs", { chats });
  }),
);

// edit route
app.get(
  "/chats/:id/edit",
  asuncWrap(async (req, res) => {
    let { id } = req.params;
    let chats = await chat.findById(id);
    res.render("edit.ejs", { chats });
  }),
);

// update route
app.put(
  "/chats/:id",
  asuncWrap(async (req, res) => {
    let { id } = req.params;
    let { message: newmsg } = req.body;
    let updatechat = await chat.findByIdAndUpdate(
      id,
      { message: newmsg },
      { runValidators: true, new: true },
    );
    // console.log(updatechat);
    res.redirect("/chats");
  }),
);

// destroy route
app.delete(
  "/chats/:id",
  asuncWrap(async (req, res) => {
    let { id } = req.params;
    let deletedchat = await chat.findByIdAndDelete(id);
    res.redirect("/chats");
  }),
);

app.get("/", (req, res) => {
  res.send("root is working");
});

// by funcion error name print through middleware
const handlervalidator = (err) => {
  console.log("This was a validation error, please follow rules");
  console.dir(err);
  return err;
};

// error name print through middleware
app.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === "ValidatorError") {
    handlervalidator(err);
  }
  next(err);
});

// error handler middlewares
app.use((err, req, res, next) => {
  let { status = 500, message = "some error occour" } = err;
  res.status(status).send(message);
});

app.listen(8080, () => {
  console.log("server started");
});
