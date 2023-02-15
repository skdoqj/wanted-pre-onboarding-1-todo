import { useState, useEffect } from "react";

function Regex() {

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
        const emailInput = e.target.value;

        setForm({ ...form, email: emailInput });

        if (emailRegex.test(emailInput)) {
            setIsEail(true);
        } else {
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
          setIsPassword(true);
        } else {

          setIsPassword(false);
        }
      };    

      // 유효성 검사에 따른 버튼 활성화
    const regexTest = () => {
        if (isEmail && isPassword) {

        setDisabled(false);
        } else {

        setDisabled(true);
        }
    }
 
    useEffect(()=>{
        regexTest();
    },[form])



return {
   form,
   disabled,
   onChangeEmail,
   onChangePassword
    };
}

export default Regex;