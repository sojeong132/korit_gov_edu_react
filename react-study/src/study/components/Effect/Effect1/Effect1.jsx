import React, { use, useEffect, useState } from 'react';

function Effect1(props) {
    const [ name, setName ] = useState("");
    const [ age, setAge ] = useState("");
    const [ h1Name, setH1Name ] = useState("");
    const [ h1Age, setH1Age ] = useState("");

    const handleNameOnChange = (e) => {
        setName(e.target.value);
    }

    const handleAgeOnChange = (e) => {
        setAge(e.target.value);
    }

    const handleNameOnClick = () => {
        setH1Name(name);            // 비동기
        console.log(h1Name);        // 바로 바뀐 정보 안 뜸 (이전 정보가 뜸)
    }

    const handleAgeOnClick = () => {
        setH1Age(age);
    }

    // useEffect(() => {                       // 이렇게만 작성 시 칠 때 마다 값이 리턴 (h1Name과 h1)
    //     console.log(h1Name);
    //     console.log(h1Age);
    // });

    useEffect(() => {
        console.log(h1Name);
        console.log(h1Age);
    }, [h1Name, h1Age]);

    return (
        <div>
            <h1>{h1Name}</h1>
            <h1>{h1Age}</h1>
            <input type="text" value={name} onChange={handleNameOnChange}/>
            <button onClick={handleNameOnClick}>이름확인</button>
            <input type="text" value={age} onChange={handleAgeOnChange}/>
            <button onClick={handleAgeOnClick}>나이확인</button>
        </div>
    );
}

export default Effect1;
