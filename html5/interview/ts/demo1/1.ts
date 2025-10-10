let a: any = 1; // any 任何类型，ts新手，狂用any
a = '1' // 不能滥用
// function getFirstElement(arr: any[]): any {
//     return arr[0]
// }
// // 复用性，函数参数，返回值 指定类型
// const numbers = [1,2,3]
// const firstNumber = getFirstElement(numbers)

// const strs = ['1', '2', '3']
// const firstString = getFirstElement(strs)

// 复用这个函数的同时，传入类型参数

function getFirstElement<T>(arr: T[]): T | undefined {
    return arr.length > 0 ? arr[0] : undefined
}

const numbers = [1, 2, 3]
const firstNum = getFirstElement<number>(numbers)
console.log(firstNum?.toFixed(2))
const strs = ['hello', '2', '3']
const firstStr = getFirstElement(strs) // 类型推导
console.log(firstStr?.toUpperCase())