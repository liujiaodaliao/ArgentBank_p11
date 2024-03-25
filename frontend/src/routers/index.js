import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/home/index";
import Sign from "../pages/sign/index";
import User from "../pages/user/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/home",
    element: <Home></Home>,
  },
  {
    path: "/sign",
    element: <Sign></Sign>,
  },
  {
    path: "/user",
    element: <User></User>,
  },
]);

export default router;
