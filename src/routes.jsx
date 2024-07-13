import { blogLoader, pageLoader, postLoader, profileLoader, authorPageLoader } from "./loaders";
import Page from "./components/Page";
import Home from "./components/Home";
import Error from "./components/Error";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Blog from "./components/Blog";
import Post from "./components/Post";
import CreatePostForm from "./components/CreatePostForm";
import Profile from "./components/Profile";
import AuthorPage from "./components/AuthorPage";
import DraftList from "./components/DraftList";
import EditPostForm from "./components/EditPostForm";

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
          { path: "/author", element: <DraftList /> },
          { path: "/author/edit/:postid", element: <EditPostForm />, loader: postLoader },
          { path: "/author/create", element: <CreatePostForm /> },
        ]
      },
    ],
  },
];

export default routes;
