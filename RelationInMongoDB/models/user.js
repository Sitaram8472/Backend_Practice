// getting-started.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("connected started"))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationdemo");
}

const User = mongoose.model("User", userSchema);

const addUsers = async () => {
  let user1 = new User({
    username: "sitaram",
    address: [
      {
        location: "kolkata",
        city: "kalyani",
      },
    ],
  });

  user1.address.push({ location: "wall 3 parkstreet", city: "london" });
  let result = await user1.save();
  console.log(result);
};

addUsers();
