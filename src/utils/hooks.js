import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "./consts";

const getToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!accessToken && !refreshToken) {
    console.error("There is no token");
  }
  return { accessToken, refreshToken };
};

const useProtected = () => {
  const { accessToken, refreshToken } = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken && !refreshToken) {
      navigate(HOME_ROUTE);
    }
  }, [accessToken, refreshToken, navigate]);
};

export default useProtected;
