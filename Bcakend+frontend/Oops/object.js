// factory maker function

// function personmaker(name, age) {
//   const person = {
//     name: name,
//     age: age,
//     talk() {
//       console.log("i am ready to talk");
//     },
//   };
//   return person;
// }
// let p1 = personmaker("sitaram", 19)  // copy  both p1 and p2 never equls so that always crete own // copy so that this not good way
// let p2 =personmaker("Rahul", 20);

// console.log(p1);
// console.log(p2);

// new operator
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }

// Person.prototype.talk = function () {
//   console.log(`Hi my name is ${this.name}`);
// };

// let p1 = new ("sitaram", 19)();
// let p2 = new ("Rahul", 20)();

// by class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  talk() {
    console.log(`my name is ${this.name}`);
  }
}

let p1 = new Person("Rahul", 12);
let p2 = new Person("Shubham", 21);

// inheritance
class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  talk(){
    console.log("he can talk")
  }
}

class Teacher extends Student {
  constructor(name, age, marks) {
    super(name, age);
    this.talk();
    this.marks = marks;
  }
}

let s1 = new Teacher("Rahul", 23, 95);
let s2 = new Teacher("Sitaram", 20, 99);

console.log(s1);
console.log(s2);
s1.talk();
s2.talk();
