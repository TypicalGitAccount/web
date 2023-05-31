import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../сontext/AuthContext";

const PrivateRoute = () => {
  const user = useContext(AuthContext)?.user;
  return <>{user ? <Outlet /> : <Navigate to="/web/login" replace={true} />}</>;
};

export default PrivateRoute;
