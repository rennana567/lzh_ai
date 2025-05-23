/*
@desc 页面背景切换
@author lll
@date 2025-05-10 10:00:00
*/
// JS面向对象 语言
// 事件监听
// 弹窗加载完成后
document.addEventListener('DOMContentLoaded', () => {
    //获取按钮元素
    document.getElementById('changeColorButton').addEventListener('click', () => {
        
      // 使用 chrome.tabs.query 方法查询当前活动的标签页
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // 检查是否存在活动的标签页，并且标签页有 ID
        if (tabs[0]?.id) {
          // 向指定标签页发送消息，消息内容包含操作类型和颜色值
          chrome.tabs.sendMessage(tabs[0].id, { 
            action: "changeBackgroundColor", // 操作类型：改变背景颜色
            color: "pink"                   // 颜色值：粉色
          });
        }
      });
    });
  });