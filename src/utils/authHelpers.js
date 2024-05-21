import axios from "axios";
import { $host, $authHost } from "../http/index";

export const refresh = async () => {
  try {
    const { data } = await $host.post(
      "/api/user/refresh",
      {},
      {
        withCredentials: true,
      }
    );
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data.accessToken;
  } catch (error) {
    console.error("Refresh token error:", error);
    await logout();
    return null;
  }
};

export const logout = async () => {
  try {
    await $authHost.post("/api/user/logout");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
