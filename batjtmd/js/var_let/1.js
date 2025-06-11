"use strict"
// 严格模式下，函数内部的变量不能被重新赋值
var b = 10;
(function b(){
    b = 20; // 不生效
    console.log(b);
})()
