var person1 = { name: `소녀시대`, age: 20 }
var person2 = { name: `걸스데이`, age: 21 }

function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.walk = function(speed) {
  console.log(speed + `km 속도로 걸어간다.`)
}

var person3 = new Person(`소녀시대`, 20)
var person4 = new Person(`걸스데이`,22)
var person5 = new Person(`몰라`, 33)

console.log(person5);


person5.walk(1);
person5.walk = 2;
console.log(person5.walk);
