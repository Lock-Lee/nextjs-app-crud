import axios, { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // ต้องตั้งใน .env
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      config.headers["x-user-id"] = userId;
    }
  }
  return config;
});

export default api;
