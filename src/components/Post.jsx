import { useLoaderData } from "react-router-dom";

const Post = function() {
  const { post } = useLoaderData();
  
  return(
    <div>
      <p>{post.title}</p>
      <p>{post.subheader}</p>
      <p>{post.body}</p>
    </div>
  )
}

export default Post;