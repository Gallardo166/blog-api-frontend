import Page from "./components/Page";
import Home from "./components/Home";
import Error from "./components/Error";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Blog from "./components/Blog";

const routes = [
  {
    path: "/",
    element: <Page />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      { path: "/blog", element: <Blog />}
    ],
  },
];

export default routes;