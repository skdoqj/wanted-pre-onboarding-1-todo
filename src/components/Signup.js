import '../style/auth.css'

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpPost, signinPost } from "../api/api_module";
import Regex from "./Regex";

function Signup() {
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
    } = Regex();


  // axios 
  const signUp = () => {

    signUpPost(form.email, form.password).then((res) => {
      alert("회원가입 되셨습니다");
      movePage("/signin");
    }).catch((error) => {
      console.error(error);
    });;
  };

  

  return (
    <div className='auth_page'>
      <h1 className='title'>SIGNUP</h1>
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
          onClick={signUp}
          disabled={disabled}
          data-testid="signup-button"
        >
          Signup
        </button>
        <div className='bottom_text'>
        <Link to="/signin">로그인 페이지</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
