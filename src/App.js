import Todo from "./components/Todo.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";


//라우터
import { BrowserRouter, Routes, Route} from "react-router-dom";
//리다이렉트
import { Navigate } from "react-router-dom"

import { useEffect, useState } from "react";

function App() {

 //로그인 판별
 const [isLogin, setIsLogin] = useState()
 useEffect (()=>{
   if (localStorage.getItem('signin_token') == null){
    setIsLogin(false);
   }else{
    setIsLogin(true);
   }
   console.log()
 },[])

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={isLogin ? <Navigate replace to="/todo" /> : <Navigate replace to="/signin" />} />
          {/* <Route path="/todo" element={isLogin ? <Todo /> : <Navigate replace to="/signin" />} /> */}
          {/* <Route path="/signin" element={isLogin ? <Navigate replace to="/todo" /> : <Login />} /> */}
          {/* <Route path="/signup" element={isLogin ? <Navigate replace to="/todo" /> : <Signup />} /> */}

          <Route path="/todo" element={<Todo />} />
          <Route path="/signin" element={ <Login />} />
          <Route path="/signup" element={ <Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
