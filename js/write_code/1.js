// 完成的功能
// function objectFactory() {
//     var obj = {}
//     // 类数组上没有shift 方法，所以借用数组的shift 方法
//     var Constructor = [].shift.call(arguments) // 构造函数
//     obj.__proto__ = Constructor.prototype // 原型
//     var ret = Constructor.apply(obj, arguments) // 改变this 指向
//     // || null 的情况 仍然会返回object 构造函数 return 简单类型， 忽略
//     return typeof ret === 'object' ? ret || obj : obj
// }

// es6 版本
function objectFactory(Constructor,...args) {
    var obj = {}
    // 类数组上没有shift 方法，所以借用数组的shift 方法
    // var Constructor = [].shift.call(arguments) // 构造函数
    obj.__proto__ = Constructor.prototype // 原型
    var ret = Constructor.apply(obj, args) // 改变this 指向
    // || null 的情况 仍然会返回object 构造函数 return 简单类型， 忽略
    return typeof ret === 'object' ? ret || obj : obj
}

function Person(name, age) {
    this.name = name;
    this.age = age;
    return 1;
}

Person.prototype.sayHi = function (){
    console.log(`你好，我是${this.name}`)
}
// let p = new Person('zs', 18) 
// p.sayHi()
let p1 = new Person('zs', 18)
console.log(p1)

let p = objectFactory(Person, 'zs', 18)
console.log(p)
p.sayHi()
console.log(p instanceof Person)

// new Person(...) -> function [[constructor]] -> && this -> {} ->
//  [[call]] -> {}.__proto__ -> Constructor.prototype -> return {} 