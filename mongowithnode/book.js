const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("mongoose connection success");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/delta_app");
}

// const bookSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     require: true,
//   },
//   author: String,
//   price: Number,
// });

// const Book = mongoose.model("Book", bookSchema);

// let book1 = new Book({
//   title: "Mathematics xii",
//   author: "RD Sharma",
//   price: 1200,
// });

// book1
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// schema type option
const bookuserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// int his sche,all thing mentions
const bookuser = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [30, "Name cannot exceed 30 characters"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },

  role: {
    type: String,
    enum: {
      values: ["user", "admin"],
      message: "Role must be user or admin",
    },
    default: "user",
  },

  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});
