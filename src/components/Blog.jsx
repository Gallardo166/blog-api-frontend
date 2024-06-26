import Preview from "./Preview";
import { useLoaderData } from "react-router-dom";

const Blog = function() {
  const { posts } = useLoaderData();

  return(
    <div>
      {posts && posts.map((post) => (
        <Preview key={post._id} post={post} />
      ))}
    </div>
  )
}

export default Blog;