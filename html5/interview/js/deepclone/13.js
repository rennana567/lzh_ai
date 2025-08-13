const target = {
    name: 'target',
    field1: undefined,
    field4:{
        field5: 'field5',
        field6: {
            field7: 'field7'
        }
    }
}

// console.log(JSON.parse(JSON.stringify(target)))
// 递归 + 拷贝
// 对数组支持不好
function clone(target){
    if(typeof target === 'object'){
        let cloneTarget = {} // 分配新空间
        for(const key in target){ // 遍历
            cloneTarget[key] = clone(target[key])
        }
        return cloneTarget
    }else {
        return target
    }
}

let obj = clone(target)
obj.field4.field6.field7 = 'a'
console.log(obj, target)

