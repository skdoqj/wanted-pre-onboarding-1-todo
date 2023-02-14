import { useEffect, useState } from "react";
import List from "./Todolist";
import { getTodo, createTodo } from "../api/api_module";
import { useNavigate } from "react-router-dom";

function Todo() {
  const movePage = useNavigate();
  
  // 로그인 판별
  useEffect (()=>{
    if (localStorage.getItem('signin_token') == null){
      movePage("/signin");
      console.log('로컬 값 없음')
    }else{
      console.log('로컬 값 있음')
    }
  },[])
  
  
  const [todoList, setTodoList] = useState([]);

  const getTodoList = ()=> {
    getTodo().then(res => console.log(res.data))
  };
  
  useEffect(()=> {
    getTodoList()
  },[])

  const onSubmit = (event) => {
    event.preventDefault();
    if (event.target[0].value == "") {
      return alert("텍스트를 입력해주세요");
    } else {
      let valueText = event.target[0].value;
      const todo = {
        id: Math.random(),
        valueText,
        checked: false,
      };
      setTodoList([...todoList, todo]);
      
      //axios post
      createTodo(todo.valueText).then((res)=>{
        console.log('todo 추가 완료')
      }).catch((err) => {console.log(err)})
      event.target[0].value = "";
    }
  };
  console.log(todoList);

  // 투두 삭제
  const deleteTodo = (id) => {
    console.log(id);
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  // 투두 수정
  const updateTodo = (id, updateText) => {
    console.log(updateText);
    setTodoList(
      todoList.map((item) =>
        item.id == id ? { ...item, valueText: updateText } : item
      )
    );
  };

  //로그아웃
  const onLogout = () => {
  // 데이터 삭제
  localStorage.removeItem('signin_token')

  // 모든 것 삭제
  // localStorage.clear()
  // window.location.reload();
  movePage("/signin");
  };

  return (
    <>
      {/* 투두 입력 */}
      <button
      onClick={onLogout}>로그아웃</button>
      <div>TODO LIST</div>
      <form onSubmit={onSubmit}>
        <input data-testid="new-todo-input"></input>
        <button data-testid="new-todo-add-button">ADD</button>
      </form>

      {/* 투두 리스트 */}
      {/* <List todo={todoList} /> */}

      <ul>
        {todoList.map((item, index) => (
          <List
            key={item.id}
            id={item.id}
            text={item.valueText}
            checked={item.checked}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </ul>
    </>
  );
}

export default Todo;
