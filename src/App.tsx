import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Root from "./customRoutes/PublicRoutes.jsx";
import PrivateRoute from "./customRoutes/PrivateRoutes.jsx";
import Loading from "./UI/Loading.tsx";

const Login = lazy(() => {
  return import("./UI/Login.tsx");
});
const AddItem = lazy(() => {
  return import("./UI/AddItem.tsx");
});
const AddAsset = lazy(() => {
  return import("./UI/AddAsset.tsx");
});
const AddStock = lazy(() => {
  return import("./UI/AddStock.tsx");
});
const AddCustomer = lazy(() => {
  return import("./UI/AddCustomer.tsx");
});
const AddSupplier = lazy(() => {
  return import("./UI/AddSupplier.tsx");
});
const CreateBranch = lazy(() => {
  return import("./UI/CreateBranch.tsx");
});

const PurchaseItem = lazy(() => {
  return import("./UI/PurchaseItems.tsx");
});

const AddEmployee = lazy(() => {
  return import("./UI/AddEmployee.tsx");
});

const router = createBrowserRouter([
  { path: "/", Component: Root, children: [{ index: true, Component: Login }] },
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
      { path: "/private/purchase", Component: PurchaseItem },
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
