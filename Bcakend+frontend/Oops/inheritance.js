class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class Teacher extends Student {
  constructor(name, age, marks) {
    super(name, age);
    this.marks = marks;
  }
}

let s1 = new Teacher("Rahul", 23, 95);
let s2 = new Teacher("Sitaram", 20, 99);


console.log(s1);
console.log(s2);