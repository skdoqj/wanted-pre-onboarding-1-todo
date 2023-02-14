import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpPost, signinPost } from "../api/api_module";
import Regex from "./Regex";

function Signup() {
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


  // axios 
  const signUp = () => {
    console.log(form.email, form.password);
    signUpPost(form.email, form.password).then((res) => {
      alert("success", "회원가입 성공");
      movePage("/signin");
    }).catch((error) => {
      // console.log(error);
      console.error(error);
    });;
  };

  

  return (
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
        <button
          onClick={signUp}
          disabled={disabled}
          data-testid="signup-button"
        >
          회원가입
        </button>
      </form>
    </>
  );
}

export default Signup;
