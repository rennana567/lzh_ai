# 手写 React

- DidReact

  - 命名空间
  - 对象字面量

## VDOM

- UI 表达的 JSX ,TSX
- JSX -->编译成 React.createElement() ---> VDOM
- DidReact.createElement()

- App.jsx --> babel --> DidReact.createElement(tag,props,...children)
- DidReact.createElement(tag,props,...children) 这个函数返回 VDOM
- babel 将 jsx 转译为 React.createElement() 方法调用，给对应参数，生成 VDOM
- @babel/preset-react ,生成 VDOM
- pragma 编译后的函数名

## createElement

- App.jsx --> babel --> DidReact.createElement(tag,props,...children)
- DidReact.createElement(tag,props,...children) 这个函数返回 VDOM
- 由 VNode 节点组成的 VDOM 树 ，每个节点包含 type props
- 每个节点包含 type props props.children 是字节点，也是一个对象
- React.createElement()
  React.createElement 返回的 Element 就是一个描述“要在页面上渲染什么”的普通 JavaScript 对象（即虚拟 DOM 节点），它包含 type、props 等属性，是 React 用来对比变化并高效更新真实 DOM 的虚拟表示。
- React.createTextElement() 这么复杂？？
  - type 没有
  - children 没有的
  - 为啥要有这些参数，就是为了参数统一

## 目前完成

- React is name
- The createElement Function (工厂模式)
- The render Function

## 未完成

- Concurrent Mode 并发模式
- fibers 机制
- fiber 节点就是一个工作节点
- fiber 节点有那些属性

## VDOM --> render() 生成真正的 DOM
