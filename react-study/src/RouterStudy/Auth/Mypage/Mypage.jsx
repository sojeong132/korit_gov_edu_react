/** @jsxImportSource @emotion/react */
import { useQueryClient } from '@tanstack/react-query';
import * as s from './styles';
import React, { useState } from 'react';
import axios from 'axios';

function Mypage(props) {
    const queryClient = useQueryClient();
    const principalUserQueryData = queryClient.getQueryData(["principalUserQuery"]);
    console.log(principalUserQueryData);

    const [ userInfo, setUserInfo ] = useState({
        username: principalUserQueryData.data.principal.username,
        fullName: principalUserQueryData.data.principal.fullName,
        email: principalUserQueryData.data.principal.email,
    });

    const handleUserInfoOnChange = (e) => {
        setUserInfo(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }
    
    const handleUserInfoModificationOnClick = () => {
        if(!userInfo.fullName || !userInfo.email) {
            alert("성명 또는 이메일을 입력하세요.");
            return;
        }
        const principal = principalUserQueryData.data.principal;

        if(principal.fullName === userInfo.fullName && principal.email ===  userInfo.email) {
            alert("변경사항이 없습니다.");
            return;
        }

        const accessToken = localStorage.getItem("AccessToken");
        axios.put(`http://localhost:8080/api/users/${principal.userId}`, userInfo, {
            headers: {
                Authorization: !accessToken ? null : `Bearer ${accessToken}`
            }
        })
    }
    
    const [ passwordInfo, setPasswordInfo ] = useState({
        oldPassword: "",
        newPassword: "",
        newPasswordCheck: "",
    });
    
    const handlePasswordInfoInChange = (e) => {
        setPasswordInfo(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const handlePasswordInfoModificationOnClick = () => {
        if(!!JSON.stringify(Object.values(passwordInfo).find(value => !value))) {
            alert("비밀번호를 입력하세요.");
            return;
        }

        const principal = principalUserQueryData.data.principal;
        // UserPasswordModifyDto
        const accessToken = localStorage.getItem("AccessToken");
        try {
            const response = axios.put(`http://localhost:8080/api/users/${principal.userId}/password`, passwordInfo, {
                headers: {
                    Authorization: !accessToken ? null : `Bearer ${accessToken}`
                }
            });
            console.log(response);
        } catch(error) {
            console.log(error);
            const errorRespone = error.response;
            console.log(errorRespone);
        }
    }

    return (
        <div>
            <div>
                <h2>사용자 정보 수정</h2>
                <div>
                    <input type="text" name='username' placeholder='사용자이름' disabled={true} value={userInfo.username} onChange={handleUserInfoOnChange} />
                </div>
                <div>
                    <input type="text" name='fullName' placeholder='성명' value={userInfo.fullName} onChange={handleUserInfoOnChange} />
                </div>
                <div>
                    <input type="text" name='email' placeholder='이메일' value={userInfo.email} onChange={handleUserInfoOnChange} />
                </div>
                <button onClick={handleUserInfoModificationOnClick}>변경하기</button>
            </div>
            <div>
                <h2>비밀번호 변경</h2>
                <div>
                    <input type="password" name='oldPassword' placeholder='기존 비밀번호 확인' value={passwordInfo.oldPassword} onChange={handlePasswordInfoInChange} />
                </div>
                <div>
                    <input type="password" name='newPassword' placeholder='새 비밀번호' value={passwordInfo.newPassword} onChange={handlePasswordInfoInChange} />
                </div>
                <div>
                    <input type="password" name='newPasswordCheck' placeholder='새 비밀번호 확인' value={passwordInfo.newPasswordCheck} onChange={handlePasswordInfoInChange} />
                </div>
                <button onClick={handlePasswordInfoModificationOnClick}>변경하기</button>
            </div>
        </div>
    );
}

export default Mypage;