// 자식 요소 전달방법
// 1. props 속성을 사용해서 전달
// 2. props에 내장되어진 children 속성을 사용해서 전달

function Props3({ch1, children}) {

    // console.log(props);
    // const ch1 = <h2>chapter 1</h2>

    return <div>
        <h1>자식요소 학습하기</h1>
        {ch1}
        {children}
    </div>
}

export default Props3;

// 비구조할당 복습
function fx1() {
    const obj = {
        data1: "d1",
        data2: "d2",
    }
    const objData1 = obj.data1;

    const {data1, data2} = obj;

    console.log(obj.data1);
    console.log(obj.data1);
    console.log(obj.data1);
    console.log(obj.data1);
    console.log(obj.data1);
// 너무 번거로움 그렇기에 ↓와 같이 변경
    console.log(objData1);
    console.log(data1);

    function fx2(oData1, oData2, oData3, oData4) {

    }
// ↓와 같이 호출하고 싶은데 귀찮음
    fx2(obj.data1, obj.data2, obj.data3, obj.data4);

// 그러니 비구조할당을 사용하여 {} 묶어버리자
    function fx2({oData1, oData2, oData3, oData4}) {

    }
// 알아서 호출하게 두자
    fx2(obj);
}