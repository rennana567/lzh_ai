// 声明了一个对象常量
// 内存中开辟了一个空间，里面存放了一个对象
// 这个对象的地址，赋值给了hxt & 变量名是地址的标记
// js是弱类型语言 变量的类型由值决定的
// = 赋值 Objext
// 对象字面量（字面意义上） JSON
// JS 太灵活，不需要new， 通过{}拿到对象 []拿到数组

const hxt = {
    name: '黄新天',
    age: 20,
    tall:187,
    hometown:'山东临沂',
    isSigle:true
}

const pyc = {
    name:'小彭',//key value String
    age:'21',//Number 数值类型
    hometown:'新余',
    isSigle:true,//Boolean 布尔类型
    //送花
    //形象
    sendFlower:function(gril){
    console.log(pyc.name + '给'+gril.name+'送99朵花');
    gril.reciveFlower(pyc);
}
}

const xm = {
    xq:30,//心情
    name:'小美',
    reciveFlower:function(sender){
        console.log('收到了'+sender.name+'的99朵花');
        if(xm.xq >= 99){
            console.log('商场走一波')
        }else{
            console.log('gun...')
        }
    }
}

//帮彭老板的  小美的闺蜜
const xh = {
    xq:30,//心情
    name:'小红',
    room:'408',
    hometown:'新余',//老乡
    //送小美， 送小红 都具有resiveFlower 方法
    //对象互换
    //接口 interface
    reciveFlower:function(sender){
        // if(sender.name === '彭奕淳'){
        //     console.log('彭哥哥，我们在一起吧');
        //     return;
        // }
        setTimeout(()=>{//定时器
            xm.xq = 99;
            xm.reciveFlower(sender);
        },3000)

    }
}
pyc.sendFlower(xh)
// pyc.sendFlower(xm)
