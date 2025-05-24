/*
@func 反转字符串
@param {string} str
@return string
*/ 
function reverseString(str) {
    // str 是什么类型 字符串 简单数据类型 primitive
    
    return str.split('').reverse().join('');
  }

  console.log(reverseString('hello')); // Output: 'olleh'

  // 函数表达式
  // es5 函数表达式
  const reverseString2 = function(str){
    return str.split('').reverse().join('');
  }
  // es6 箭头函数 简洁 function 不要了 用简单的箭头代替
  // {} 也省了 只有一句话的时候 可以省了
  // 他是返回值的时候 连retrun 都可以省略
  const reverseString3 = str => str.split('').reverse().join('');

  console.log(reverseString3('hello')); // Output: 'olleh'