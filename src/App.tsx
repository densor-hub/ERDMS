import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import PublicRoute from "./customRoutes/PublicRoutes.jsx";
import PrivateRoute from "./customRoutes/PrivateRoutes.jsx";
import Loading from "./Pages/Loading.tsx";

const Login = lazy(() => {
  return import("./Pages/Login.tsx");
});
const AddItem = lazy(() => {
  return import("./Pages/AddItem.tsx");
});
const AddAsset = lazy(() => {
  return import("./Pages/AddAsset.tsx");
});
const AddStock = lazy(() => {
  return import("./Pages/AddStock.tsx");
});
const AddCustomer = lazy(() => {
  return import("./Pages/AddCustomer.tsx");
});
const AddSupplier = lazy(() => {
  return import("./Pages/AddSupplier.tsx");
});
const CreateBranch = lazy(() => {
  return import("./Pages/CreateBranch.tsx");
});

const PurchaseItem = lazy(() => {
  return import("./Pages/PurchaseItems.tsx");
});

const AddEmployee = lazy(() => {
  return import("./Pages/AddEmployee.tsx");
});

const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicRoute,
    children: [{ index: true, Component: Login }],
  },
  {
    path: "/private",
    Component: PrivateRoute,
    children: [
      { path: "/private/add-item", Component: AddItem },
      { path: "/private/add-asset", Component: AddAsset },
      { path: "/private/add-stock", Component: AddStock },
      { path: "/private/add-customer", Component: AddCustomer },
      { path: "/private/add-supplier", Component: AddSupplier },
      { path: "/private/create-branch", Component: CreateBranch },
      { path: "/private/purchase-items", Component: PurchaseItem },
      { path: "/private/employ", Component: AddEmployee },
    ],
  },
]);

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  );
};

export default App;
