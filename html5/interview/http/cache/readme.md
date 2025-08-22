# 缓存

## url 输入到页面

- 知识体系
- 多进程多线程是前提
- 深入网址并 dns 解析
  - 有结构的字符串
  - 非结构字符串 搜索关键字
  - 协议：// 域名 ：端口 /path?query=value#fragment
  http(s)
  web 80 nginx proxy 300
  443 https

- 浏览器解析协议、主机、端口、路径等，并**构造**一个http请求
    - 发送请求前，根据请求头的expires 和 cache-control 判断是否命中强缓存策略
        https://www.baidu.com/index.js + 请求头
        缓存文件 + 请求头在一起（文件的属性一样）
    - 强缓存
        Expires 过期时间  http 1.0
        响应头cache-control + 文件本地缓存，在过期时间范围内，不用请求，直接用本地缓存内容  http 1.1 升级为cache-control

    - 协商缓存
        强缓存没有命中，这个资源在服务器端也不一定修改了，怎么对一下
    Cookie
    url 背后的 请求行、请求头、请求体
    同一主机的不同端口，对应的是不同的程序或服务
    dns -> ip 地址 80 -> http 443 https 3306 mysql
    - 补全url
    比如输入baidu.com  https://www.baidu.com/
    - http://www.baidu.com/ 不安全
        307 跳转 307 Temproary Redirect 临时重定向
        Location: https://www.baidu.com/
        再请求一次
        301 Moved Permanently    GET 请求    302 Found Moved Temporary
        308 Permanent Redirect               307 Temporary Redirect

        301/302 只支持GET，哪怕请求不是GET，也会改成GET
        307/308 各种方法 不会改