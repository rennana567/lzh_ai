// 类型推断机制是指编译器根据变量、函数或表达式的初始值或上下文自动推导出类型。无需显示申明
// as 类型断言

function sum(a: number, b: number){
    return a + b;
}
// 类型别名
type SumReturn = ReturnType<typeof sum>;

function fetchData<T>(data:T){
    return {
        data,
        timestamp: Date.now()
    }
}

type Result = ReturnType<typeof fetchData<string>>;