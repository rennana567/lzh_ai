// 数组对象
const arr = ['1','2','3'];
console.log(typeof arr);
const date = new Date();
console.log(typeof date);
// 如何区分Object 的这些类型？
// [object Array]
// [object Date]
console.log(typeof Object.prototype.toString.call(arr));
console.log(Object.prototype.toString.call(date));

// 会在MDN 文档看一些资料
function getType(value){
  //将[object Array]变成Array
  return Object.prototype.toString.call(value).slice(8,-1);
   
}
console.log(getType(arr));
console.log(getType(date));