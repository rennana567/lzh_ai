const target = {
    a:1
}

Object.assign(target,null)
Object.assign(target,undefined)

// Object.assign(undefined,{a:1})  目标对象必须是对象，写number、string可以的原因是其会自动转换成为其包装对象。null和undefined不会

const obj = {name: 'zs'}
Object.assign(obj)