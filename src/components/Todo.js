import { useEffect, useState } from "react";
import List from "./Todolist";
import { getTodo, createTodo, deleteTodoAPI , updateTodoAPI} from "../api/api_module";
import { useNavigate } from "react-router-dom";

function Todo() {
  const movePage = useNavigate();
  
  // 로그인 판별
  useEffect (()=>{
    if (localStorage.getItem('signin_token') == null){
      movePage("/signin");
      console.log('로컬 값 없음')
    }
  },[])
  
  
  const [todoList, setTodoList] = useState([]);

  const getTodoList = ()=> {
    getTodo()
    .then(res => {
      const getData = res.data
      setTodoList(getData)
    })
  };
  
  useEffect(()=> {
    getTodoList()
  },[])


  const onSubmit = (event) => {
    event.preventDefault();
    if (event.target[0].value == "") {
      return alert("텍스트를 입력해주세요");
    } else {
      let todo = event.target[0].value;
      const todoItem = {
        id: '',
        todo,
        isCompleted: false,
      };
      setTodoList([...todoList, todoItem]);
      
      //axios post
      createTodo(todoItem.todo).then((res)=>{
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

    deleteTodoAPI(id)
    .then(console.log('투두삭제'))
    .catch(err => console.log(err));
  };

  // 체크박스
  const onCheck = (id, checked) => {
    console.log(id, checked)
    
    // setTodoList(
    //   todoList.map((item) =>
    //     item.id == id ? { ...item, isCompleted: checked } : item
    //   )
    // );

  }

  // 투두 수정
  const updateTodo = (id, updateText, checkBox) => {
    const todo = updateText
    const isCompleted = checkBox
    console.log(id, todo, isCompleted);
    setTodoList(
      todoList.map((item) =>
        item.id == id ? { ...item, todo: todo, isCompleted: isCompleted} : item
      )
    );
    console.log(todoList.find(item => item.id == id ? item.isCompleted : null))
    
    // updateTodoAPI(id , todo, isCompleted)
    // .then(console.log('투두업데이트'))
    // .catch(err => console.log(err));
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
            text={item.todo}
            isCompleted={item.isCompleted}
            onCheck={onCheck}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </ul>
    </>
  );
}

export default Todo;
