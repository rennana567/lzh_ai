// node 运行 global 顶级对象
if (typeof globalThis.gc === 'function') {
    globalThis.gc() // 手动触发垃圾回收
} else {
    console.log('gc() function is not available. Run node with --expose-gc flag to enable it.')
}
console.log(process.memoryUsage())

let map = new Map()
let key = new Array(1000000)

console.log(process.memoryUsage())

key = null // 手动释放

console.log(process.memoryUsage())
map = null
global.gc()

console.log(process.memoryUsage())