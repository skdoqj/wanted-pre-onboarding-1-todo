import { client } from "./api";

export const signUpAPI = async (email, password) => {
  return client.post("/auth/signup", { email, password });
};

export const signinAPI = async (email, password) => {
  return client.post("/auth/signin", { email, password });
};
