import React from 'react'
//如何约束函数的返回值为ReactNode？ JSX
// FC == function components

interface HelloComponentProps {
  name: string;
  age?: unknown;
}
// typescript 类型约束， 重要的地方一定要类型约束
// 参数， 返回值
// 泛型 泛指内部的类型
const HelloComponent : React.FC<HelloComponentProps> = (props) => {
    return (
        <h2>hello user:{props.name}, age:{props.age}</h2>
    )
}

export default HelloComponent