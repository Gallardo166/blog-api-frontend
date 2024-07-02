import { useContext } from "react"
import { Data } from "./Page"
import { Link, useLoaderData } from "react-router-dom";

const Profile = function() {
  const { user } = useContext(Data);
  const { comments } = useLoaderData();
  console.log(comments);

  return(
    <div>
      <p>{user.username}</p>
      <p>Your comments:</p>
        {comments.length > 0 && comments.map((comment) => (
          <Link to={`/blog/${comment.post}`} key={comment._id}>{comment.body}</Link>
        ))}
    </div>
  )
}

export default Profile;