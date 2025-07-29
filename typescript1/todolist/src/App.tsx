import './App.css'
import HelloComponent from './components/HelloComponent.tsx'
// react + typescript
// javascript 可能会有些问题， 主要因为弱类型
// jsx 后缀改成tsx

// 函数进行类型约束
// const HelloComponent = () => {
//   // void 空 ReactNode
//   return 1
// }
function App() {
  // 编译阶段
  // 多了类型声明文件
  // 多写了一些代码 类型申明 代码质量保驾护航
  let count:number = 10;
  const title:string = 'hello ts'
  const isDone:boolean = true
  const list:number[] = [1,2,3]
  // 元祖类型
  const tuple: [number, string] = [1, '2']
  // 枚举类型
  enum Status {
    Pending,
    Fullfilled,
    Rejected
  }
  const pStatus: Status = Status.Pending
  // 对象的约束
  // 接口类
  interface User{
    name:string;
    age: number;
    isSingle?: boolean;
  }
  const user:User = {
    name: 'zhangsan',
    age: 18,
    isSingle: true
  }
  return (
    <>
      {count}
      {title}
      {Status.Fullfilled}
      {user.name}
      {/* typescript 很严格 */}
      <HelloComponent name='zhangsan' age={18} />
    </>
  )
}

export default App
