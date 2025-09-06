
const str = "我的手机号是：13345678901，有空打给我"
const str2 = 'hello world'

const reg = /1[3-9]\d{9}/; // /  / 简写方式

console.log(reg.test(str))
// console.log(reg.test(str2))

console.log(str.match(reg))

const str3 = '我的{name}';
const str4 = str3.replace(/\{name\}/,"小茂米")
console.log(str4)