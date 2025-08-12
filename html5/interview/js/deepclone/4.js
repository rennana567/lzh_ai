const source = {
    // 对象的嵌套
    b:{
        name:'xm',
        hobbise:['study','coding']
    }
}
// 浅拷贝
// Object.assign(target,source)
const newObj = JSON.parse(JSON.stringify(source))
newObj.b.name='xh'

console.log(newObj,source)