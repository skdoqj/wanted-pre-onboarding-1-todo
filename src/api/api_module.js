import { client } from "./api";

export const signUpPost = async (email, password) => {
  return client.post("/auth/signup", { email, password });
};

export const signinPost = async (email, password) => {
  return client.post("/auth/signin", { email, password });
};


export const createTodo = async (todo) => {
  return client.post("/todos", { todo });
};

export const getTodo = async () => {
  return client.get("/todos");
};

export const updateTodoAPI = async(id, todo , isCompleted) => {
  return client.put(`/todos/${id}`, {todo, isCompleted});
};

export const deleteTodoAPI = async (id) => {
  return client.delete(`/todos/${id}`);
};
