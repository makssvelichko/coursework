import axios from "axios";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  console.log(`Токен з authInterceptor: ${localStorage.getItem("token")}`);
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
