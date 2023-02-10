import axios from "axios";

// const API_KEY = client.env.REACT_APP_API_KEY;

export const client = axios.create({
  baseURL: "https://pre-onboarding-selection-task.shop/",
  headers: {
    // CORS
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  config.headers.authorization = `${accessToken}`;
  // if (accessToken && config.headers) {
  //   config.headers["Authorization"] = `Bearer ${accessToken}`;
  // }
  return config;
});
