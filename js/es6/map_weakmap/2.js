global.gc()
console.log(process.memoryUsage())

const wm = new WeakMap()
let key = new Array(5*1024*1024)
wm.set(key, 1)
global.gc()
console.log(process.memoryUsage())

key = null
global.gc()
console.log(process.memoryUsage())
console.log(wm)
for(let [k,v] of wm.entries()){
    console.log(k, v)
}