import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpPost, signinPost } from "../api/api_module";

function Signup() {
  const movePage = useNavigate();

  useEffect (()=>{
    if (localStorage.getItem('signin_token') !== null){
      console.log('로컬 값 있음')
      movePage("/todo");
    } 
  },[])


  const [form, setForm] = useState([
    {
      email: "",
      password: "",
    },
  ]);

  // 유효성 검사
  const [isEmail, setIsEail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  //버튼 활성화
  const [disabled, setDisabled] = useState(true);

  const onChangeEmail = (e) => {
    e.preventDefault();
    // 이메일 유효성
    const emailRegex =
    /([\w-.]+)@([\w-.]+)$/;
      // /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailInput = e.target.value;
    setForm({ ...form, email: emailInput });

    if (emailRegex.test(emailInput)) {
      console.log("이메일 맞음");
      setIsEail(true);
    } else {
      console.log("이메일 틀림");
      setIsEail(false);
    }
  };
  const onChangePassword = (e) => {
    e.preventDefault();
    // 비밀번호 유효성
    const passwordRegex = /^[\da-zA-Z!@#]{8,}$/;

    const passwordInput = e.target.value;
    setForm({ ...form, password: passwordInput });

    if (passwordRegex.test(passwordInput)) {
      console.log("비밀번호 맞음");
      setIsPassword(true);
    } else {
      console.log("비밀번호 틀림");
      setIsPassword(false);
    }
  };
// 유효성 검사에 따른 버튼 활성화
  const regexTest = () => {
    if (isEmail && isPassword) {
      // console.log("둘다 유효성 통과");
      setDisabled(false);
    } else {
      // console.log("틀림");
      setDisabled(true);
    }
  }
 
  useEffect(()=>{
    regexTest();
  },[form])

  // axios 
  const signUp = () => {
    console.log(form.email, form.password);
    signUpPost(form.email, form.password).then((res) => {
      movePage("/signin");
      alert("success", "회원가입 성공");
    }).catch((error) => {
      // console.log(error);
      console.error(error);
    });;
  };


  //회원가입 버튼 클릭
  console.log(isEmail, isPassword);



    
  

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
