import { $host } from "./index";
import { jwtDecode } from "jwt-decode";

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
  return data.user;
};

export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};
