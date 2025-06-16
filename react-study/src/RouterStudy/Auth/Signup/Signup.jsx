/** @jsxImportSource @emotion/react */
import { CiCircleCheck } from 'react-icons/ci';
import * as s from './styles';
import React, { useEffect, useState } from 'react';
import { MdOutlineCheckCircle, MdOutlineErrorOutline } from 'react-icons/md';
import { IoEye, IoEyeOff } from 'react-icons/io5';

/**
*   유효성검사(Validation Check)
*/

function useSignInAndUpInput({ type, name, placeholder, value, valid }) {
    const STATUS = {
        idle : "idle",
        success: "success",
        error: "error",
    };
    const [ inputvalue, setInputValue ] = useState(value);
    const [ status, setStatus ] = useState(STATUS.idle);

    const handleOnChange = (e) => {
        console.log(e.target.value);
        setInputValue(e.target.value);
    }

    const handleOnBlur = (e) => {
        if(isEmpty(e.target.value)) {
            setStatus(STATUS.idle);
            return;
        }

        if(valid.enabled) {
            setStatus(valid.regex.test(e.target.value) ? STATUS.success : STATUS.error);
            return;
        }
    }

    const isEmpty = (str) => {
        return !/^.+$/.test(str);
    }

    return {
        inputvalue,
        element: <SignInAndUpInput 
            type={type} 
            name={name} 
            placeholder={placeholder} 
            value={value} 
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            status={status}
            message={valid.defaultMessage} />
    }
}

function SignInAndUpInput({type, name, placeholder, value, onChange, onBlur, status, message}) {

    return (
        <div css={s.inputItem}>
            <div css={s.inputContainer(status)}>
                <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} />
                {
                    status !== "idle"
                    && (
                        status === "success" 
                        ? <div><MdOutlineCheckCircle /></div>
                        : <div><MdOutlineErrorOutline /></div>
                    )
                }
            </div>
            <InputValidatedMessage status={status} message={message} />
        </div>) 
    
}

function PasswordInputHiddenButton() {
    const [ isShow, setShow ] = useState(false);

    const handleOnClick = () => {
        setShow(prev => !prev);
    }

    return <p onClick={handleOnClick}>{isShow ? <IoEyeOff /> : <IoEye />}</p>
}

function useInputValidatedMessage({defaultMessage}) {
    const STATUS = {
        idle : "idle",
        success: "success",
        error: "error",
    };
    const [ status, setStatus ] = useState(STATUS.idle);
    const [ message, setMessage ] = useState(defaultMessage || "");

    return {
        status,
        setStatus,
        message,
        setMessage,
        element: <InputValidatedMessage status={status} message={message}/>
    }
}
// ↑ 여기까지 후에 작성

function InputValidatedMessage({status, message}) {
    const ERROR = "error";

    if (status === ERROR) {
        return <div css={s.messageContainer()}>{message}</div>
    }
    return <div css={s.messageContainer()}>{message}</div>
}

function Signup(props) {

    const [ inputState, setInputState ] = useState({
        username: {
            value: "",
            message: "아이디는 영문, 숫자를 포함 4~20자여야 합니다.",
            regex: /^(?=.*[a-z])(?=.*\d).{4,20}$/,
            status: "idle", //success(성공), error(오류), idle(초기 대기상태)
        },
        password: {
            value: "",
            message: "비밀번호는 8~20자이며, 영문·숫자·특수문자를 모두 포함해야 합니다.",
            regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,20}$/,
            status: "idle",
        },
        checkPassword: {
            value: "",
            message: "비밀번호가 서로 일치하지 않습니다.",
            status: "idle",
        },
        fullName: {
            value: "",
            message: "이름은 한글 2~20자여야 합니다.",
            regex: /^[가-힣]{2,20}$/,
            status: "idle",
        },
        email: {
            value: "",
            message: "유효하지 않은 이메일 형식입니다.",
            regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            status: "idle",
        }
    });

    const [ showPassword, setShowPassword ] = useState(false);
    const [ submitDisabled, setSubmitDisabled ] = useState(true);

    const [ inputs, setInputs ] = useState([    // 후에 작성
        {
            type: "text",
            name: "username",
            placeholder: "사용자 이름",
            value: "",
            valid: {
                enabled: true,
                regex: /^(?=.*[a-z])(?=.*\d).{4,20}$/,
                message: "아이디는 영문, 숫자를 포함 4~20자여야 합니다.",
            },
        },
        {
            type: "password",
            name: "password",
            placeholder: "비밀번호",
            value: "",
            valid: {
                enabled: true,
                regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,20}$/,
                message: "비밀번호는 8~20자이며, 영문·숫자·특수문자를 모두 포함해야 합니다.",
            },
        },
        {
            type: "password",
            name: "checkPassword",
            placeholder: "비밀번호 확인",
            value: "",
            valid: {
                enabled: false,
                regex: null,
                message: "비밀번호가 서로 일치하지 않습니다.",
            },
        },
    ]);

    const inputItems = inputs.map(input => useSignInAndUpInput(input)); // 후에 작성

    // const usernameInputValidatedMessage = useInputValidatedMessage();   // 후에 작성

    const handleOnChange = (e) => {
        setInputState(prev => ({
            ...prev,
            [e.target.name]: {
                ...prev[e.target.name],
                value: e.target.value,
            }
        }));
    }

    const handleOnBlur = (e) => {
        if(!/^.+$/.test(inputState[e.target.name].value)) {
            setInputState(prev => ({
                ...prev,
                [e.target.name]: {
                    ...prev[e.target.name],
                    status: "idle",
                }
            }));
            return;
        }
        if(e.target.name === "checkPassword") {
            if(e.target.value.trim().length > 0 && inputState.password.status === "success") {
                setInputState(prev => ({
                    ...prev,
                    checkPassword: {
                        ...prev["checkPassword"],
                        status: prev["checkPassword"].value === prev["password"].value ? "success" : "error"
                    }
                }));
            }
            return;
        }

        setInputState(prev => ({
            ...prev,
            [e.target.name]: {
                ...prev[e.target.name],
                status: prev[e.target.name].regex.test(prev[e.target.name].value) ? "success" : "error",
            }
        }));
    }

    useEffect(() => {
        setSubmitDisabled(!!Object.values(inputState).map(obj => obj.status).find(status => status !=="success"));
    }, [inputState]);

    return (
        <div css={s.layout}>
            <div css={s.container}>
                <h1 css={s.title}>회원가입</h1>
                {/* <div css={s.inputItem}>
                    <div css={s.inputContainer(inputState.username.status)}>
                        <input type="text" name='username' placeholder='아이디' value={inputState.username.value} onChange={handleOnChange} onBlur={handleOnBlur} />
                        <div>
                            {
                                inputState.username.status !== "idle"
                                && (
                                    inputState.username.status === "success" 
                                    ? <MdOutlineCheckCircle />
                                    : <MdOutlineErrorOutline />
                                )
                            }
                        </div>
                    </div>
                    {
                        inputState.username.status === "error" &&
                        <div css={s.messageContainer()}>{inputState.username.message}</div>
                    }
                </div>

                <div css={s.inputItem}>
                    <div css={s.inputContainer(inputState.password.status)}>
                        <input type={showPassword ? "text" : "password"} name='password' placeholder='비밀번호' value={inputState.password.value} onChange={handleOnChange} onBlur={handleOnBlur} />
                        <p onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <IoEyeOff /> : <IoEye />}</p>
                        {
                            inputState.password.status !== "idle"
                            && (
                                inputState.password.status === "success" 
                                ? <div><MdOutlineCheckCircle /></div>
                                : <div><MdOutlineErrorOutline /></div>
                            )
                        }
                    </div>
                    {
                        inputState.password.status === "error" &&
                        <div css={s.messageContainer()}>{inputState.password.message}</div>
                    }
                </div>

                <div css={s.inputItem}>
                    <div css={s.inputContainer(inputState.checkPassword.status)}>
                        <input type={showPassword ? "text" : "password"} name='checkPassword' placeholder='비밀번호 확인' value={inputState.checkPassword.value} onChange={handleOnChange} onBlur={handleOnBlur} />
                        <div>
                            {
                                inputState.checkPassword.status !== "idle"
                                && (
                                    inputState.checkPassword.status === "success" 
                                    ? <MdOutlineCheckCircle />
                                    : <MdOutlineErrorOutline />
                                )
                            }
                        </div>
                    </div>
                    {
                        inputState.checkPassword.status === "error" &&
                        <div css={s.messageContainer()}>{inputState.checkPassword.message}</div>
                    }
                </div>

                <div css={s.inputItem}>
                    <div css={s.inputContainer(inputState.fullName.status)}>
                        <input type="text" name='fullName' placeholder='사용자 이름' value={inputState.fullName.value} onChange={handleOnChange} onBlur={handleOnBlur} />
                        <div>
                            {
                                inputState.fullName.status !== "idle"
                                && (
                                    inputState.fullName.status === "success" 
                                    ? <MdOutlineCheckCircle />
                                    : <MdOutlineErrorOutline />
                                )
                            }
                        </div>
                    </div>
                    {
                        inputState.fullName.status === "error" &&
                        <div css={s.messageContainer()}>{inputState.fullName.message}</div>
                    }
                </div>

                <div css={s.inputItem}>
                    <div css={s.inputContainer(inputState.email.status)}>
                        <input type="text" name='email' placeholder='이메일' value={inputState.email.value} onChange={handleOnChange} onBlur={handleOnBlur} />
                        <div>
                            {
                                inputState.email.status !== "idle"
                                && (
                                    inputState.email.status === "success" 
                                    ? <MdOutlineCheckCircle />
                                    : <MdOutlineErrorOutline />
                                )
                            }
                        </div>
                    </div>
                    {
                        inputState.email.status === "error" &&
                        <div css={s.messageContainer()}>{inputState.email.message}</div>
                    }
                </div> */}
                {
                    inputItems.map(inputItem => inputItem.element)
                }
            </div>
            <button css={s.submitButton} disabled={submitDisabled}>가입하기</button>
        </div>
    );
}

export default Signup;


/**
 * username, password, checkpassword, fullname(한글), email 
 * javascript 정규표현식을 각각 만들어주고 error메세지도 만들어줘
 */