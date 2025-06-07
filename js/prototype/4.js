function Person(name, age) {
    // this 指向当前实例化的对象
    this.name = name;
    this.age = age;
}
Person.prototype.sayHello = function () {
        console.log(`hello,my name is ${this.name}`)
}

var zs = new Person('zs', 18);
console.log(zs.__proto__);
var a = {
    name:'a',
    home:'山东'
}
zs.__proto__ = a;
console.log(zs.__proto__);
console.log(zs.home)
console.log(Person.prototype)
console.log(Person.prototype.constructor == Person)
console.log(zs.eee)