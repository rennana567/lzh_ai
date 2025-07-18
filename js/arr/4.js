// 如何遍历数组
// - for(let i=0...) 计数循环 性能好  可读性不好 不是人脑，电脑
// - while
// - forEach 不能够退出
// - map filter some every ...
// - for of 
const names = Array.of('张三','李四','王五','赵六')
// console.log(names)
names.forEach(name => {
    if (name === '张三'){
        console.log('我是' + name);
        // break
        return
    }
    console.log('Processing'+name)
})

for(const [index, name] of names.entries()) {
  console.log(`第${index}位: ${name}`);
}