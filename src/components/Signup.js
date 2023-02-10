import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpAPI } from "../api/auth";

function Signup() {
  const movePage = useNavigate();

  const [form, setForm] = useState([
    {
      email: "",
      password: "",
    },
  ]);

  // 유효성 검사
  const [isEmail, setIsEail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  //버튼
  const [submit, setSubmit] = useState(false);

  const onChangeEmail = (e) => {
    e.preventDefault();
    // 이메일 유효성
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
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

  const signUp = () => {
    console.log(form.email, form.password);
    signUpAPI(form.email, form.password).then(() => {
      movePage("/signin");
      alert("success", "회원가입 성공");
    });
  };

  //회원가입 버튼 클릭
  console.log(isEmail, isPassword);
  const onSignupSubmit = (e) => {
    e.preventDefault();
    if (isEmail && isPassword) {
      // console.log("둘다맞음");
      setSubmit(true);
      signUp();
    } else {
      // console.log("틀림");
      setSubmit(false);
    }
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
          onClick={onSignupSubmit}
          // disabled={submit ? "none" : true}
          data-testid="signup-button"
        >
          회원가입
        </button>
      </form>
    </>
  );
}

export default Signup;
