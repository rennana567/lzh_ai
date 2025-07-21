// es6 模块化
// mjs 后缀使用es6 模块化
// 模块化是语言的能力
// node 默认不支持es6 模块化
// node 最新版本支持了 22
// node 准备跟require commonjs saygoodbye
// es6 nodule 更先进 mjs
import http from 'http';

const server = http.createServer((req,res)=>{
    res.end('hello world')
})

server.listen(1234)