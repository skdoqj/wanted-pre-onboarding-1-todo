function List({ todo }) {
  console.log(todo);

  const deleteTodo = (id) => {
    console.log(id);
  };

  return (
    <ul>
      {todo.map((item, index) => (
        <li key={index}>
          <label>
            <input type="checkbox" />
            <span className={`${item.checked ? "checked" : ""}`}>
              {item.valueText}
            </span>
            <button data-testid="modify-button">수정</button>
            <button
              onClick={() => deleteTodo(item.id)}
              data-testid="delete-button"
            >
              삭제
            </button>
          </label>
        </li>
      ))}
    </ul>
  );
}
export default List;
