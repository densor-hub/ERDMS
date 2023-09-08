import { Outlet, Navigate } from "react-router-dom";
const PublicRoutes = () => {
  const auth = {
    accessToken: false,
  };
  return !auth?.accessToken ? <Outlet /> : <Navigate to={"/"}></Navigate>;
};

export default PublicRoutes;
