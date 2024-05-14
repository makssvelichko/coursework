import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (
  username,
  email,
  password,
  sex,
  age,
  weight,
  height
) => {
  const { data } = await $host.post("api/user/registration", {
    username,
    email,
    password,
    sex,
    age,
    weight,
    height,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const fetchUsers = async () => {
  return $authHost.get("api/user/users");
};
