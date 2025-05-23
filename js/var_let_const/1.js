//代码 
// 编译阶段：
//   一霎那，语法检测
//  执行阶段
// 当前作用域的顶部
// 变量提升是面试官喜欢的，js开发者设计的
// 不好，代码的执行结果和代码阅读顺序不一致，有歧义
// 糟粕，避开
//申明一个变量不再使用var，用let，const代替
showName()// 驼峰式命名
console.log(myName);

var myName = '我是myName'
function showName(){
    let b = 3;
    console.log('我是showName');
}