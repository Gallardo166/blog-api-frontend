import { createContext } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

export const AuthorContext = createContext({});

const AuthorPage = function() {
  const { posts } = useLoaderData();

  const handlePublishDraft = async function(post) {
    const token = localStorage.getItem("token");
    try {
      await fetch(
        import.meta.env.DEV ? `http://localhost:3000/posts/${post._id}` : null,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`,
          },
          body: JSON.stringify({
            title: post.title,
            subheader: post.subheader,
            body: post.body,
            categories: JSON.stringify(post.categories),
            isPublished: true,
            publishDate: Date.now(),
          }),
        }
      );
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnpublishDraft = async function(post) {
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("title", post.title);
    data.append("subheader", post.subheader);
    data.append("body", post.body);
    data.append("categories", JSON.stringify(post.categories));
    data.append("isPublished", false);
    try {
      await fetch(
        import.meta.env.DEV ? `http://localhost:3000/posts/${post._id}` : null,
        {
          "method": "PUT",
          "mode": "cors",
          "headers": {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`
          },
          "body": JSON.stringify({
            title: post.title,
            subheader: post.subheader,
            body: post.body,
            categories: JSON.stringify(post.categories),
          }),
        }
      );
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <AuthorContext.Provider value={{ handlePublishDraft, handleUnpublishDraft, posts }}>
        {!posts ? <p>Please log in.</p> : <Outlet />}
      </AuthorContext.Provider>
    </section>
  )
}

export default AuthorPage;