console.log('start');
// node 微任务
// process 进程对象
process.nextTick(()=>{
    console.log('Process Next Tick');
})
Promise.resolve().then(()=>{
    console.log('Promise Resolved');
})
// 宏任务
setTimeout(()=>{
    console.log('setTimeout');
    Promise.resolve().then(()=>{
        console.log('Promise Resolved');
    })
},0)
console.log('end');