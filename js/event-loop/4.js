console.log('start')
const promise1 = Promise.resolve('promise1')
const promise2 = Promise.resolve('promise2')
const promise3 = new Promise(resolve => {
    console.log('The promise3')
    resolve('promise3')
})
promise1.then(res => {
    console.log(res)
})
promise2.then(res => {
    console.log(res)
})
promise3.then(res => {
    console.log(res)
})
setTimeout(() => {
    console.log('下一把再见')
    const promise4 = Promise.resolve('promise4')
    promise4.then(res => {
        console.log(res)
    })
    setTimeout(()=>{
        console.log('下下一把再见')
    })
},0)
console.log('end')