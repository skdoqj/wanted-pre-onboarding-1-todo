import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signinPost } from "../api/api_module";

function Login() {
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

  const onChangeEmail = (e) => {
    const emailInput = e.target.value;
    setForm({ ...form, email: emailInput });
  }
  const onChangePassword = (e) => {
    const passwordInput = e.target.value;
    setForm({ ...form, password: passwordInput });
  }
  
  // 로그인
  const onLogin = (e) => {
    e.preventDefault();
    // console.log(form.email, form.password);
    
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
  
  return <>
  <form>
    <label>email</label>
  <input
    type="email"
    onChange={onChangeEmail}
    placeholder="@email.com"
    data-testid="email-input"
    ></input>
  <label>password</label>
  <input 
  type="password"
    onChange={onChangePassword}
    placeholder="8자 이상"
    data-testid="password-input"
  ></input>
  <button onClick={onLogin}
  data-testid="signin-button">로그인</button>
  </form>
  
  <label>회원이 아니신가요?</label>
  <Link to="/signup">회원가입</Link>
  
  </>;
}

export default Login;
