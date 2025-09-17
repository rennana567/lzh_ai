// 工程化：css 模块化
import styles from './button.module.css'
console.log(styles)
const Button = ()=>{
    return <button className={styles.button}>Button</button>
}

export default Button