import { useContext, useState } from "react"
import { Data } from "./Page"
import { useLoaderData } from "react-router-dom";
import CommentPreview from "./CommentPreview";
import styles from "../styles/Profile.module.css";

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
    <section className={styles.profilePage}>
      <p className={styles.top}>Username</p>
      {isEditing ? (
        <div className={styles.bottom}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
          <div className={styles.buttons}>
            <button className={styles.cancelEdit} onClick={() => {
              setIsEditing(false);
              setUsername(user.username);
            }}>Cancel</button>
            <button disabled={username === user.username || username === ""} className={styles.saveEdit} onClick={handleChangeUsername}>Save</button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.bottom}>
            <p>{user.username}</p>
            <button className={styles.editButton} onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        </>
      )}
      <hr />
      <div className={styles.comments}>
        <p>Your comments:</p>
        {comments.length > 0 && comments.map((comment) => (
          <>
            <CommentPreview comment={comment} />
          </>
        ))}
      </div>
    </section>
  )
}

export default Profile;