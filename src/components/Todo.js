import { useEffect, useState } from "react";
import List from "./Todolist";

function Todo() {
  const [todoList, setTodoList] = useState([]);

  const onSubmit = (event) => {
    if (event.target[0].value == "") {
      return alert("텍스트를 입력해주세요");
    } else {
      event.preventDefault();
      let valueText = event.target[0].value;
      const todo = {
        id: todoList.length,
        valueText,
        checked: false,
      };
      setTodoList([...todoList, todo]);
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
    console.log(updateText)
    setTodoList(todoList.map((item)=> item.id == id ? {...item, valueText : updateText} :item))

  }

  return (
    <>
      {/* 투두 입력 */}
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

          // <li key={index}>
          //   <label>
          //     <input type="checkbox" />
          //     {modify ? (
          //       <input></input>
          //     ) : (
          //       <span className={`${item.checked ? "checked" : ""}`}>
          //         {item.valueText}
          //       </span>
          //     )}

          //     <button onClick={() => modifyTodo()} data-testid="modify-button">
          //       수정
          //     </button>
          //     <button
          //       onClick={() => deleteTodo(item.id)}
          //       data-testid="delete-button"
          //     >
          //       삭제
          //     </button>
          //   </label>
          // </li>
        ))}
      </ul>
    </>
  );
}

export default Todo;
