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
  // Перевірка формату електронної пошти
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email)) {
    alert('Електронна пошта вказана без домену');
    window.history.back();
    return;
  }

  if (password.length < 4) {
    alert('Пароль повинен містити принаймні 4 символи');
    window.history.back();
    return;
  }

  try {
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
    console.log(`Дані юзера: ${data.token}`);
    return jwtDecode(data.token);
  } catch (error) {
    localStorage.removeItem("token");
    if (error.response && error.response.status === 404) {
      alert('Сталася помилка. Будь ласка, спробуйте пізніше.');
      return;
    } else if (error.response && error.response.status === 409) {
      alert('Електронна пошта вже існує в базі даних');
      return;
    } else {
      console.log(error);
    }
  }
};

export const login = async (email, password) => {
  try {
    const { data } = await $host.post("api/user/login", { email, password });
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      alert('Неправильний пароль або ім\'я користувача');
    } else {
      alert('Сталася помилка. Будь ласка, спробуйте пізніше.');
    }
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};