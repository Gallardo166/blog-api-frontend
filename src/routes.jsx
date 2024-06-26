import { blogLoader, pageLoader, postLoader } from "./loaders";
import Page from "./components/Page";
import Home from "./components/Home";
import Error from "./components/Error";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Blog from "./components/Blog";
import Post from "./components/Post";

const routes = [
  {
    path: "/",
    element: <Page />,
    errorElement: <Error />,
    loader: pageLoader,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      { path: "/blog", element: <Blog />, loader: blogLoader },
      { path: "/blog/:postid", element: <Post />, loader: postLoader },
    ],
  },
];

export default routes;
