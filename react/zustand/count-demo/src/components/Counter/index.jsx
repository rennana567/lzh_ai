
import { useCounterStore } from "../../store/count";
const Counter = () => {
    const {
        count,
        increment,
        decrement,
        reset
    } = useCounterStore();

    return(
        <>

          <button onClick={decrement}>-</button>
          <span onClick={reset}>count:{count}</span>
          <button onClick={increment}>+</button>
        </>
    )
}

export default Counter;