# 单例模式

## 实现Storage，使得该对象为**单例**，基于localStorage，进行封装，实现方法
setItem(key.value)  和  getItem(key)
- 分析题目
实现Storage类
- 设计模式 design pattern
- 封装

## 单例
单例是一种设计模式（static getIntstance），高级程序的交流语言
一个类只能实例化一次
- static 属性 instance 持有唯一的一次实例
- static getInstance  判断 instance 并返回
   实例的时候一定要这样
- 性能你特别好  好管理