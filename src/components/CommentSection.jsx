import { useContext, useState } from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";
import { Data } from "./Page";

const CommentSection = function ({ postid, comments }) {
  const [commentBody, setCommentBody] = useState("");
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
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section>
      {user ?
        <>
          <input type="text" value={commentBody} onChange={(e) => setCommentBody(e.target.value)} />
          <button onClick={(e) => handleClick(e)} disabled={!commentBody}>Send</button>
        </> :
        <p>Log in to comment</p>
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
