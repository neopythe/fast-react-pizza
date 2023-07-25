import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Cart from "@/features/cart/Cart";
import CreateOrder from "@/features/order/CreateOrder";
import Menu from "@/features/menu/Menu";
import Order from "@/features/order/Order";

import AppLayout from "@/ui/AppLayout";
import Home from "@/ui/Home";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/menu", element: <Menu /> },
      { path: "/order/:orderId", element: <Order /> },
      { path: "/order/new", element: <CreateOrder /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
