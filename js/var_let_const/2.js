// ReferenceError: Cannot access 'a' before initialization
// TDZ 暂时性时区 变量申明前就调用会报错(所以let也会变量提升，只不过进入的是TDZ) 
console.log(a);
let a = 1;