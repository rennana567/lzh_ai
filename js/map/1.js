// NaN Not a Number
// parseInt()  字符串转数字 JS 前端场景
// input 输入 -> Number
// map 要接受函数
// forEach
console.log(['1', '2', '3'].map(parseInt)); // [1, NaN, NaN]
console.log(['1', '2', '3'].map(a=>parseInt(a)));