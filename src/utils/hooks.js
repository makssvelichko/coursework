import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "./consts";

const getAccessToken = () => {
  const result = localStorage.getItem("token");
  if (!result) {
    console.error("There is no access token");
  }
  return result;
};

const useProtected = () => {
  const accessToken = getAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate(HOME_ROUTE);
    }
  }, []);
};

export default useProtected;
