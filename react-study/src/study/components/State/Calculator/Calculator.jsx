import { useState } from "react";

function Calculator() {
    const [result, setResult] = useState(0);
    const [input, setInput] = useState("0");

    // // eval 함수 없이 계산기를 만든다면
    // const getResult = () => {
    //     let inputText = input;
    //     let plusNums = [];
    //     let minusNums = [];
    //     let lastCalc = "";

    //     const plusIndex = input.indexOf("+");
    //     const minusIndex = input.indexOf("-");

    //     if (plusIndex === -1 && minusIndex === -1) {
    //         return;
    //     }

    //     if (plusIndex < 0) {
    //         const numText = inputText.substring(0, minusIndex);
    //         const restNumText = inputText.substring(minusIndex + 1);
    //         console.log(numText);
    //         console.log(restNumText);
    //     }

    //     if (minusIndex < 0) {
    //         const numText = inputText.substring(0, plusIndex);
    //         const restNumText = inputText.substring(plusIndex + 1);
    //         console.log(numText);
    //         console.log(restNumText);
    //     }

    //     if(plusIndex < minusIndex) {
    //         const numText = inputText.substring(0, plusIndex);
    //         const restNumText = inputText.substring(plusIndex + 1);
    //     } else {
    //         const numText = inputText.substring(0, minusIndex);
    //         const restNumText = inputText.substring(minusIndex + 1);
    //     }
    

    // }

    const handleOnClick = (e) => {
        console.log(e);
        console.log(e.target.value);
        if(input === "0") {
            setInput(e.target.value);
        } else {
            setInput(input + e.target.value);
        }
        if (e.target.value === "=") {
            // getResult();
            setResult(eval(input));
            setInput("0");
            return;
        }

    };
    return <div>
        <h1>입력 : {input}</h1>
        <h1>결과 : {result}</h1>
        <div>
            <button onClick={handleOnClick} value={0}>0</button>
        </div>
        <div>
            <button onClick={handleOnClick} value={1}>1</button>
            <button onClick={handleOnClick} value={2}>2</button>
            <button onClick={handleOnClick} value={3}>3</button>
        </div>
        <div>
            <button onClick={handleOnClick} value={4}>4</button>
            <button onClick={handleOnClick} value={5}>5</button>
            <button onClick={handleOnClick} value={6}>6</button>
        </div>
        <div>
            <button onClick={handleOnClick} value={7}>7</button>
            <button onClick={handleOnClick} value={8}>8</button>
            <button onClick={handleOnClick} value={9}>9</button>
        </div>
        <div>
            <button onClick={handleOnClick} value={"+"}>+</button>
            <button onClick={handleOnClick} value={"-"}>-</button>
            <button onClick={handleOnClick} value={"="}>=</button>
        </div>
    </div>
}

export default Calculator;