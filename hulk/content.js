// content.js 完整代码
console.log('内容脚本已加载'); // 调试语句

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('收到消息:', request); // 调试日志
  if (request.action === "changeBackgroundColor") {
    document.body.style.backgroundColor = request.color;
    sendResponse({ success: true }); // 确认响应
  }
  return true; // 保持消息通道开放
});