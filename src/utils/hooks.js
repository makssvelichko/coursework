import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "./consts";

const getToken = () => {
  const result = localStorage.getItem("token");
  if (!result) {
    console.error("There is no token");
  }
  return result;
};

const useProtected = () => {
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(HOME_ROUTE);
    }
  }, []);
};

export default useProtected;
