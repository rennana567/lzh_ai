function f1(){
    var n = 999;
    nAdd = function(){
        n += 1;
    }
    function f2(){
        console.log(n);
    }
    return f2;
}

var result = f1();
result(); // 999
nAdd(); // 记忆函数
result(); // 1000