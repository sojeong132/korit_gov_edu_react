import { useState } from "react";

function InputState1() {
    const [inputValue, setInputValue] = useState("");
    const [inputValue2, setInputValue2] = useState("");
    const [h1Text, setH1Text] = useState("");
    const [h2Text, setH2Text] = useState("");

    console.log('렌더링');

    const handleOnChange = (e) => {
        setInputValue(e.target.value);
        // console.log(e.target.value);
        }

    const handleOnChange2 = (e) => {
        setInputValue2(e.target.value);
        }

    const handleOnClick = () => {
        setH1Text(inputValue);
        setH2Text(inputValue2);
    }


    return <div>
        <h1>{h1Text}</h1>
        <h1>{h2Text}</h1>
        <input type="text" value={inputValue} onChange={handleOnChange} />
        <input type="text" value={inputValue2} onChange={handleOnChange2} />
        <button onClick={handleOnClick}>확인</button>
    </div>
}

export default InputState1;