import { useEffect, useState } from "react";

function List({ id, text, deleteTodo, updateTodo }) {
  // console.log(text);

  // 체크박스
  const [checked, setCheked] = useState(false);

  const onChangeCheck = (event) => {
    if (event.target.checked) {
      setCheked(true);
    } else {
      setCheked(false);
    }
  };

  const [modify, setModify] = useState(false);
  // 투두 수정
  const modifyTodo = () => {
    setModify(!modify);
  };
  console.log(modify);

  const [updateText, setUpdateText] = useState();
  const changeText = (e) => {
    const text = e.target.value;
    setUpdateText(text);
    
  };
  //엔터로 제출
  const onEnter = (e) => {
    // console.log(e.key)
    if(e.key == 'Enter'){
      console.log('엔터')
      updateTodo(id, updateText);
      modifyTodo();
    }
  }

  return (
    <li>
      <label>
        <input type="checkbox" onChange={onChangeCheck} />
        {modify ? (
          <input onChange={changeText} onKeyUp={onEnter}
          data-testid="modify-input"></input>
        ) : (
          <span className={`${checked ? "checked" : ""}`}>{text}</span>
        )}
        {modify ? (
          <>
            <button
              onClick={() => {
                updateTodo(id, updateText);
                modifyTodo();
              }}
              data-testid="submit-button"
            >
              제출
            </button>
            <button onClick={modifyTodo} data-testid="cancel-button">
              취소
            </button>
          </>
        ) : (
          <>
            <button onClick={modifyTodo} data-testid="modify-button">
              수정
            </button>
            <button onClick={() => deleteTodo(id)} data-testid="delete-button">
              삭제
            </button>
          </>
        )}
      </label>
    </li>
  );
}
export default List;
