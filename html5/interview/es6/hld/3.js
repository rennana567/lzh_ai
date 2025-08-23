// thenable
function light(color,ms){
    console.log(color)
    return new Promise(res => setTimeout(res,ms))
}

function loop(){
    light('red',3000)
    // 控制流程，异步变同步
      .then(()=>light('yellow',1000)
      .then(()=>light('green',3000))
      .then(loop)
    )


}

loop()
