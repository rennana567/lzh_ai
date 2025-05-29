/*
@param {number} total
@param {number} num
@return {number[]}
*/ 
function hongbao(total,num){
    const arr = [];
    let restAmount = total;// 剩余金额
    let restPeopleNum = num;//剩余个数
    for(let i = 0;i<num-1;i++){
        // Math
        // 包装类
        let amount = (Math.random()*(restAmount/restPeopleNum*2)).toFixed(2);
        restAmount -= amount;
        restPeopleNum--;
        arr.push(amount);
    }
    
    arr.push(restAmount.toFixed(2));
    //公平性
    //平均值
    //随机性
    return arr;
}
console.log(hongbao(10,5));