import axios from "axios";
import { refresh } from "../utils/authHelpers";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

const authInterceptor = (config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

$authHost.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refresh();
      if (newAccessToken) {
        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
        return $authHost(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export { $host, $authHost };
