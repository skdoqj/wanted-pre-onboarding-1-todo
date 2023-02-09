function Login() {
  return <>
  <form>
    <label>email</label>
  <input data-testid="email-input"></input>
  <label>password</label>
  <input data-testid="password-input" placeholder="8자 이상"></input>
  <button data-testid="signin-button">로그인</button>
  </form>
  
  <label>회원이 아니신가요?</label>
  <button data-testid="signup-button">회원가입</button>
  
  </>;
}

export default Login;
