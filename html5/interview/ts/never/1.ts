function error():never{
    throw new Error('error')
}

function loop():never{
    while(true){
        console.log('死循环')
    }
}

