let arr1 = [
    {
        name: '张三',
        age: 18
    },
    function(){
        console.log('函数拷贝')
    }
]
let arr2 = JSON.parse(JSON.stringify(arr1))
arr2[0].name = '李四'
arr2[0].hobbises = ['吃饭']
console.log(arr1,arr2)