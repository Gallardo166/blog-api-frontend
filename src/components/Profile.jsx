import { useContext, useState } from "react"
import { Data } from "./Page"
import { Link, useLoaderData } from "react-router-dom";

const Profile = function() {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(Data);
  const [username, setUsername] = useState(user.username);
  const { comments } = useLoaderData();

  const handleChangeUsername = async function() {
    const token = localStorage.getItem("token");
    try {
      await fetch(
        import.meta.env.DEV ? `http://localhost:3000/users/${user._id}` : "",
        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`
          },
          body: JSON.stringify({
            username,
          })
        }
      );
      location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return(
    <div>
      {isEditing ? (
        <>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
          <button onClick={() => {
            setIsEditing(false);
            setUsername(user.username);
          }}>Cancel</button>
          <button onClick={handleChangeUsername}>Confirm</button>
        </>
      ) : (
        <>
          <p>{user.username}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <p>Your comments:</p>
        {comments.length > 0 && comments.map((comment) => (
          <Link to={`/blog/${comment.post}`} key={comment._id}>{comment.body}</Link>
        ))}
    </div>
  )
}

export default Profile;