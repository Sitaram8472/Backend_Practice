// prototype and objetc

function person(name) {
  this.name = name;
}

person.prototype.sayHello = function () {
  console.log(`Hello my name is ${this.name}`);
};

const p1 = new person("siatram");
const p2 = new person("Rahul");

p1.sayHello();
p2.sayHello();

let arr = [1, 2, 3, 4];
let arr1 = [1, 2, 3, 4];
arr.sayHello = () => {
  console.log("i am array type");
};
console.log(arr);
arr1.sayHello = () => {
  console.log("i am array type");
};
console.log(arr1);