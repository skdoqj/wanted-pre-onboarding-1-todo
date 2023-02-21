import axios from "axios";

// const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY = "https://pre-onboarding-selection-task.shop/"

export const client = axios.create({
  baseURL: API_KEY,
  headers: {
    // CORS
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("signin_token");
  config.headers.authorization = `Bearer ${accessToken}`;
  
  return config;
});
