let obj1 = {
    name:'张三',
    age:18,
}

let obj2 =  obj1 // 不是复印 引用传递，只是换个名字，还是一个东西
obj2.age = 19 
console.log(obj1,obj2)

let arr1 = [1,2,3]
let arr2 = arr1
arr2.push(4)    
console.log(arr1,arr2)

// 怎么实现数组对象的拷贝