import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signinPost } from "../api/api_module";
import Regex from "./Regex";

function Login() {
    const movePage = useNavigate();

    //로그인 판별
    useEffect (()=>{
        if (localStorage.getItem('signin_token') !== null){
        console.log('로컬 값 있음')
        movePage("/todo");
        } else{
            console.log('로컬값 없음')
        }
    },[])
    
    const {
        form,
        disabled,
        onChangeEmail,
        onChangePassword
    } = Regex();



//    console.log(form.email, form.password);
    // 로그인
    const onLogin = (e) => {
    e.preventDefault();

    signinPost(form.email, form.password)
    .then((res) => {
      const token = res.data.access_token
      console.log(token);
      localStorage.setItem('signin_token',token)
      movePage("/todo");
      
      
    }).catch((error) => {
      alert('아이디 또는 비밀번호를 확인하세요');
      console.error(error);
    });
}

    return(
        <>
        <form>
        <label>email</label>
         <input
           type="email"
           onChange={onChangeEmail}
           data-testid="email-input"
           placeholder="@email.com"
         ></input>
         <span>이메일을 입력하세요</span>
         <label>password</label>
         <input
           type="password"
           onChange={onChangePassword}
           data-testid="password-input"
           placeholder="8자 이상 입력"
        ></input>
        <button onClick={onLogin}
        disabled={disabled}
        data-testid="signin-button"
        >로그인</button>
        </form>

        <label>회원이 아니신가요?</label>
        <Link to="/signup">회원가입</Link>
        </>
    )
}
export default Login;