import { useState } from "react";
import CountHeader from "../CountHeader/CountHeader";
import CountButton from "../CountButton/CountButton";

function CountState() {
    // 계속 초기화 되어서 count의 숫자가 늘지 않는 현상 발생
    // let count = 0;
    // 그걸 해결하기 위해 ↓와 같이 코드 작성
    // const countState = useState(0);

    // ↓ 좀 더 시각적으로 보기 좋게 만든 코드
    // const count = countState[0];
    // const setCount = countState[1];

    // 위의 코드를 비구조 할당으로 표현하면
    const [count, setCount] =  useState(10);
    console.log("렌더링");

    const handleOnClick = (e) => {
        console.log(e);
        console.log(e.target.value);
        const num = parseInt(e.target.value);
        console.log(typeof(num));
        // count += num;
        //      함수  (매개변수)
        // 상태값에 변화가 생기면 그 코드가 포함된 함수부터 재호출
        // countState[1](countState[0] + num);
        setCount(count + num);
    }

    return <div>
        {/* <h1>{count}</h1> */}
        {/* <h1>{countState[0]}</h1> */}
        <CountHeader count={count} />
        {/* <CountButton text={"+1"} value={1} onClick={handleOnClick} />
        <CountButton text={"-1"} value={-1} onClick={handleOnClick} /> */}
        <button onClick={handleOnClick} value={1}>+1</button>
        <button onClick={handleOnClick} value={-1}>-1</button>
    </div>
}

export default CountState;
