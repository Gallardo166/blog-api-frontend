import { useContext, useState } from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";
import { Data } from "./Page";
import styles from "../styles/CommentSection.module.css";
import { Link } from "react-router-dom";

const CommentSection = function ({ postid, comments }) {
  const [commentBody, setCommentBody] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const { user } = useContext(Data);

  const handleClick = async function(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await fetch(
        import.meta.env.DEV ? `http://localhost:3000/posts/${postid}/comments` : "",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`
          },
          body: JSON.stringify({
            body: commentBody,
          }),
        },
      );
      location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className={styles.commentSection}>
      {user ?
        <div className={styles.commentInput}>
          <textarea onFocus={() => setIsCommenting(true)} onBlur={() => setIsCommenting(false)} className={styles.input} value={commentBody} placeholder="Write a comment..." onChange={(e) => setCommentBody(e.target.value)}></textarea>
          {isCommenting && <div className={styles.buttons}>
            <button className={styles.cancel} onClick={() => setCommentBody("")}>Cancel</button>
            <button className={styles.send} onMouseDown={(e) => e.preventDefault()} onClick={(e) => handleClick(e)} disabled={!commentBody}>Send</button>
          </div>}
        </div> :
        <p><Link className={styles.link} to="/login">Log in</Link> or <Link className={styles.link} to="/signup">Sign up</Link> to comment</p>
      }
      {comments.length ? (
        comments.map((comment) => (<Comment key={comment._id} comment={comment} />))
      ) : (
        <p>No comments</p>
      )}
    </section>
  );
};

CommentSection.propTypes = {
  postid: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
}

export default CommentSection;
