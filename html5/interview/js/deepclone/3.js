const target = {
    a:1
}

const source = {
    // 对象的嵌套
    b:{
        name:'xm',
        hobbise:['study','coding']
    }
}
// 浅拷贝
Object.assign(target,source)
target.b.name='xh'

console.log(target,source)