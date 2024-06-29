import CommentSection from "./CommentSection";
import { useLoaderData } from "react-router-dom";

const Post = function() {
  const { post, comments } = useLoaderData();
  
  return(
    <div>
      <p>{post.title}</p>
      <p>{post.subheader}</p>
      <img src={post.imageurl} alt="" width="320px" />
      <p>{post.body}</p>
      <CommentSection postid={post._id} comments={comments} />
    </div>
  )
}

export default Post;