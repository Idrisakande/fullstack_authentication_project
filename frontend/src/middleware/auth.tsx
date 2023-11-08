import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";
// import { ProtectRoute } from "../constants/types";

export const AuthorizeUser = ({ children }: any) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return children;
};

export const ProtectRoute = ({ children }: any) => {
  const username = useAuthStore.getState().auth.username;

  if (!username) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return children;
};
