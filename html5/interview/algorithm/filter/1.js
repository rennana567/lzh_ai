const arr = [1,2,3,4,5]

const result1 = arr.filter(num => num > 2)
console.log(result)
// 时间复杂度？O(n)
// 能优化吗？不能优化
// 但是如果在被告知已经排好序的前提下
const index = arr.findIndex(num => num > 2)  // 大概率小于n
const result2 = arr.slice(index)
// 二分实现
function binarySearch(arr,target){
  let left = 0;
  let right = arr.length - 1;
  while(left <= right){
    let mid = Math.floor((left + right) / 2);
    if(arr[mid] === target){
      return mid;
    }else if(arr[mid] > target){
      right = mid - 1;
    }else{
      left = mid + 1;
    }
  }
}