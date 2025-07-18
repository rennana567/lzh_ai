const arr = [3,3,3]
// 可迭代对象 比计数循环好理解
for(let item of arr){
    console.log(item)
}
// for of  item 还要拿到index？
for(let item of arr.entries()){
    // 每一个都是数组，第一项是key，第二项是值
    console.log(item)
}

console.log(arr.entries())