import { blogLoader, pageLoader, postLoader, profileLoader, authorPageLoader } from "./loaders";
import Page from "./components/Page";
import Home from "./components/Home";
import Error from "./components/Error";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Blog from "./components/Blog";
import Post from "./components/Post";
import PostForm from "./components/PostForm";
import Profile from "./components/Profile";
import AuthorPage from "./components/AuthorPage";
import DraftList from "./components/DraftList";

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
      { path: "/blog/categories/:categoryid", element: <Blog />, loader: blogLoader },
      { path: "/blog/:postid", element: <Post />, loader: postLoader },
      { path: "/profile/:userid", element: <Profile />, loader: profileLoader },
      { path: "/author", 
        element: <AuthorPage />, 
        loader: authorPageLoader,
        children: [
          { path: "/author", element: <DraftList />}
        ]
      },
      { path: "/author/post", element: <PostForm /> },
    ],
  },
];

export default routes;
