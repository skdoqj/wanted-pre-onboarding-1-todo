import '../style/auth.css'

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signinPost } from "../api/api_module";
import Valid from "./Valid";

function Login() {
    const movePage = useNavigate();

    //로그인 판별
    useEffect (()=>{
        if (localStorage.getItem('signin_token') !== null){
        movePage("/todo");
        }
    },[])
    
    const {
        form,
        disabled,
        onChangeEmail,
        onChangePassword
    } = Valid();


    // 로그인
    const onLogin = (e) => {
    e.preventDefault();

    signinPost(form.email, form.password)
    .then((res) => {
      const token = res.data.access_token
      localStorage.setItem('signin_token',token)
      movePage("/todo");

    }).catch((error) => {
      alert('아이디 또는 비밀번호를 확인하세요');
      console.error(error);
    });
}

    return(
        <div className='auth_page'>
          <h1 className='title'>LOGIN</h1>
          <form className='auth_form'>

          <label>email</label>
          <input
            type="email"
            onChange={onChangeEmail}
            data-testid="email-input"
            placeholder="@email.com"
          ></input>

          <label>password</label>
          <input
            type="password"
            onChange={onChangePassword}
            data-testid="password-input"
            placeholder="8자 이상 입력"
          ></input>

          <button className={disabled? 'disabled_submit_btn' : 'submit_btn'}
          onClick={onLogin}
          disabled={disabled}
          data-testid="signin-button"
          >Login</button>
          
          
          </form>
          <div className='bottom_text'>
            <span>아직 회원이 아니신가요?</span>
            <Link to="/signup">회원가입</Link>
          </div>
        </div>
    )
}
export default Login;