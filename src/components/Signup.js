import { useState } from "react";

function Signup() {

  const [form, setForm] = useState([{
    email:'',
    password:'',
  }])

  const onChangeEmail = () => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  }

  return <>
  <form>
    <label>email</label>
  <input type='email' onChange={e=> setForm({...form, email: e.target.value})}
  data-testid="email-input" placeholder="@email.com"></input>
  <span>이메일을 입력하세요</span>
  <label>password</label>
  <input data-testid="password-input" placeholder="8자 이상 입력"></input>
  <button data-testid="signup-button">회원가입</button>
  </form>

  </>;
}

export default Signup;
