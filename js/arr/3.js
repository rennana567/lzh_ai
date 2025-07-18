const arr = new Array(5);
// console.log(arr[0])
let obj = {
    name: 'zf'
}
let obj2 = {
    skill: 'coding'
}
obj.__proto__ = obj2;
console.log(obj.skill)
for(let key in arr){
    console.log(obj[key])
}
console.log(arr.hasOwnProperty(0))
console.log(
    obj.hasOwnProperty('name'),
    obj.hasOwnProperty('skill')
)