// getting-started.js
const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("mongoose connection success");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/delta_app");
}

// define schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);
// const Empolye = mongoose.model("Empolye", userSchema);

const user1 = new User({
  name: "sitaram",
  email: "sitaram@123gmail.com",
  age: 48,
});
// user1.save();

// const user2 = new User({
//   name: "himanshu",
//   email: "himanshu@123gmail.com",
//   age: 48,
// });

// user2
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// insert multiple data
// User.insertMany([
//   {name:"Tony", email:"tony@gamil.com", age:45},
//   {name:"sony", email:"sony@gamil.com", age:55},
//   {name:"gony", email:"gony@gamil.com", age:65},
//   {name:"aony", email:"aony@gamil.com", age:25},
//   {name:"wony", email:"wony@gamil.com", age:75},
//   {name:"lony", email:"lony@gamil.com", age:85},

// ]).then((res) =>  {
//   console.log(res);
// });

// find operation
// User.find({age:{$gt: 50} })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.findById("697118b1105a5d370bb40ea7")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// update

// User.updateOne({ name: "lony" }, { age: 90 })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

User.updateMany({ age: { $gt: 70 } }, { age: 90 })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

User.findOneAndUpdate({ age: { $gt: 70 } }, { age: 20 })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

User.findByIdAndUpdate({ age: { $gt: 70 } }, { age: 65 })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

User.deleteOne({ age: { $gt: 70 } }, { age: 65 })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

User.deleteMany({ age: { $gt: 70 } }, { age: 65 })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

User.findByIdAndDelete({ age: { $gt: 70 } }, { age: 65 })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

User.findOneAndDelete({ age: { $gt: 70 } }, { age: 65 })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

  
