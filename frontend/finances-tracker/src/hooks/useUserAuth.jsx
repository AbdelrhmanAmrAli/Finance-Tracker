import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    let ismounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

        if (ismounted && response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        if (ismounted) {
          clearUser();
          navigate("/login");
        }
      }
    };
    fetchUserInfo();

    return () => {
      ismounted = false;
    };
  }, [updateUser, clearUser, navigate]);
};
