// getting-started.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("connected started"))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationdemo");
}

const orderSchema = new Schema({
  item: String,
  price: Number,
});

const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);
const Customers = mongoose.model("Customs", customerSchema);

const addcustomers = async () => {
  let cust1 = new Customers({
    name: "Rahul kumar",
  });

  let order1 = await Order.findOne({ item: "chips" });
  let order2 = await Order.findOne({ item: "chocolates" });

  cust1.orders.push(order1);
  cust1.orders.push(order2);

  let res = await cust1.save();
  console.log(res);
};

addcustomers();

// const addOrder = async () => {
//   let res = await Order.insertMany([
//     { item: "somasa", price: "12" },
//     { item: "chips", price: 10 },
//     { item: "chocolates", price: 50 },
//   ]);
//   console.log(res);
// };
// addOrder();
