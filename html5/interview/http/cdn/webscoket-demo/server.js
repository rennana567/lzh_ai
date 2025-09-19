const WebScoket = require('ws');
const http = require('http');
// 用户先要通过http协议连上服务器
const server = http.createServer((req,res) => {
    res.writeHead(200, {'Content-Type':'text/plain'})
    res.end('WebSocket Server');
});

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
// 基于http服务，监听ws 协议的请求
const wss = new WebScoket.Server({
    server,
    path: '/ws'
})
wss.on('connection',(ws) => {
    console.log('Client connected');
    ws.on('message',(message) => { 
        console.log(`Received message: ${message}`);
        ws.send(`Server received message: ${message}`);
    })
    ws.send('Welcome to WebSocket Server')
})