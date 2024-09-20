//* LIB
import { createBrowserRouter } from "react-router-dom";

//* IMPORT
import ErrorPage from "@/pages/error";
import NotFoundPage from "@/pages/notfound";
import CarPage from "@/pages/cars/page";
import App from "@/App";
import AddCarPage from "@/pages/cars/add/add";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CarPage />,
      },
      {
        path: "cars/add",
        element: <AddCarPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
    errorElement: <ErrorPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
