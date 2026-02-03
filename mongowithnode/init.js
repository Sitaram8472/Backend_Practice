const mongoose = require("mongoose");
const chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  // await mongoose.connect("mongodb://127.0.0.1:27017/delta_app");
  await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}

let allchat = [
  {
    from: "neha",
    to: "priya",
    message: "send",
    created_at: new Date(),
  },
  {
    from: "priya",
    to: "neha",
    message: "received",
    created_at: new Date(),
  },
  {
    from: "rahul",
    to: "neha",
    message: "hello",
    created_at: new Date(),
  },
  {
    from: "neha",
    to: "rahul",
    message: "hi",
    created_at: new Date(),
  },
  {
    from: "amit",
    to: "priya",
    message: "how are you?",
    created_at: new Date(),
  },
  {
    from: "priya",
    to: "amit",
    message: "fine",
    created_at: new Date(),
  },
  {
    from: "rohit",
    to: "neha",
    message: "good morning",
    created_at: new Date(),
  },
  {
    from: "neha",
    to: "rohit",
    message: "morning",
    created_at: new Date(),
  },
  {
    from: "kiran",
    to: "priya",
    message: "meeting at 5",
    created_at: new Date(),
  },
  {
    from: "priya",
    to: "kiran",
    message: "ok",
    created_at: new Date(),
  }
];


chat.insertMany(allchat);