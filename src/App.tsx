import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Cart from "@/features/cart/Cart";
import Menu, { loader as menuLoader } from "@/features/menu/Menu";
import CreateOrder, {
  action as createOrderAction,
} from "@/features/order/CreateOrder";
import Order, { loader as orderLoader } from "@/features/order/Order";
import { action as updateOrderAction } from "@/features/order/UpdateOrder";

import AppLayout from "@/ui/AppLayout";
import Error from "@/ui/Error";
import Home from "@/ui/Home";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        errorElement: <Error />,
        action: updateOrderAction,
        loader: orderLoader,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
