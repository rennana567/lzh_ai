// # 红绿灯

// - 同步阻塞
    // sleep 函数
// - 显示时间
// - 轮询

(async () => {
    console.log('start')
    await sleep(2000)
    console.log('end')
})()

function sleep(time){
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve()
        },time)
    })
}