import { $host, $authHost } from "./index";
import { jwtDecode } from "jwt-decode";
import { handleErrors } from "../errors/handleErrors";

const setTokens = (data) => {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const registration = async (userData) => {
  try {
    const formData = new FormData();
    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    const { data } = await $host.post("api/user/registration", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setTokens(data);
    return jwtDecode(data.accessToken);
  } catch (error) {
    handleErrors(error);
  }
};

export const login = async (email, password) => {
  try {
    const { data } = await $host.post("api/user/login", { email, password });
    setTokens(data);
    return jwtDecode(data.accessToken);
  } catch (error) {
    handleErrors(error);
  }
};

export const logout = async () => {
  try {
    console.log("Logging out");
    await $authHost.post("api/user/logout", {}, { withCredentials: true });
    removeTokens();
  } catch (error) {
    handleErrors(error);
  }
};
