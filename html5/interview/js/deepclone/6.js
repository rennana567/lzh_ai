// 请问，你在项目开发中具体使用过吗
// 怎么用的 参数的默认值
// 默认值 用户会传的  Object.assign 收入囊中
// Option 是会传入的对象
// 目标对象是{}空对象 合并用户传参和默认参数，合并配置对象
function createUser(options){
    const defaults ={
        name:'张三',
        age:18,
        isAdmin:false
    }
    const config = Object.assign({},defaults,options)
    console.log(config)
}

createUser({name:'王五',age:20})

const baseConfig = {api:'api',timeout:500}
const envConfig = {timeout:1000,debug:true}
const finalConfig = Object.assign({},baseConfig,envConfig)
finalConfig.api = 'https://api.github.com'
console.log(finalConfig,baseConfig,envConfig)

