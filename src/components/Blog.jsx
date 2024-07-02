import PreviewList from "./PreviewList";
import Categories from "./Categories";
import { useLoaderData, useParams } from "react-router-dom";

const Blog = function () {
  const { posts } = useLoaderData();
  const { categoryid } = useParams();

  return (
    <div>
      <Categories />
      <PreviewList
        posts={
          categoryid
            ? posts.filter(
                (post) =>
                  !!post.categories.find(
                    (category) => category._id === categoryid
                  )
              )
            : posts
        }
      />
    </div>
  );
};

export default Blog;
