// Object.defineProperty()
var obj = {} // 对象
// es5 就提供的api  兼容性更好
// react 和vue 最新版 对浏览器有要求
Object.defineProperty(obj,'num',{
    value: 1,
    // 属性描述符
    configurable: true,
    writable: false,
    enumerable: false,
    // set: function(newValue) {
    //     console.log('set')
    //     this.value = newValue
    // },
    // get: function() {
    //     console.log('get')
    //     return this.value
    // }
})
obj.num = 2
console.log(obj.num)
// delete obj.num
// console.log(obj.num)

for (let key in obj) {
    console.log(key)
}

console.log(Object.getOwnPropertyDescriptor(obj,'num'))
Object.defineProperty(obj,'name',{
    writable: true
})

obj.name = '张三'
console.log(obj.name)

for (let key in obj) {
    console.log(key)
}