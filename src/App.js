import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Root from "./customRoutes/PublicRoutes";
import PrivateRoute from "./customRoutes/PrivateRoutes";
import Loading from "./UI/Loading";

const Login = lazy(() => {
  return import("./UI/Login");
});
const AddItem = lazy(() => {
  return import("./UI/AddItem");
});
const AddAsset = lazy(() => {
  return import("./UI/AddAsset");
});
const AddStock = lazy(() => {
  return import("./UI/AddStock");
});
const AddCustomer = lazy(() => {
  return import("./UI/AddCustomer");
});
const AddSupplier = lazy(() => {
  return import("./UI/AddSupplier");
});
const CreateBranch = lazy(() => {
  return import("./UI/CreateBranch");
});

const PurchaseItem = lazy(() => {
  return import("./UI/PurchaseItems");
});

const AddEmployee = lazy(() => {
  return import("./UI/AddEmployee");
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
