import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Setting } from "./pages/Setting";
import { Error } from "./pages/Error";
import { Pagi } from "./pages/Pagi";
import { Petang } from "./pages/Petang";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/setting",
      element: <Setting />,
    },
    {
      path: "/pagi",
      element: <Pagi />,
    },
    {
      path: "/petang",
      element: <Petang />,
    },
  ]);
  return <RouterProvider router={router} />;
}
