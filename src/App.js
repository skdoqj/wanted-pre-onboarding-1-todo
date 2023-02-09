import "./App.css";
import Todo from "./components/Todo.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";

//라우터
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/todo" element={<Todo />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
