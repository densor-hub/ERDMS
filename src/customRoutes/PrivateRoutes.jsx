import { Outlet, Navigate } from "react-router-dom";
const PrivateRoute = () => {
  const auth = {
    accessToken: true,
  };
  return auth?.accessToken ? <Outlet /> : <Navigate to={"/"}></Navigate>;
};

export default PrivateRoute;
