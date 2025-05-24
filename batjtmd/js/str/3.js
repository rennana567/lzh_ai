// 包装类
let a = 'abc'
let b = new String('abc')
console.log(a == b); // 值相等
// js 给所有的简单数据类型提供了 相应类型的类 包装类
console.log(a === b); // 类型不同
console.log(b.split(''))
// 为了统一面向对象写法
// js 会自动把简单数据类型 包装成对象
// a -> new String('abc')
// 包装完成后 会自动销毁
console.log(a.split(''))