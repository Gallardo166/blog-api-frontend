import PropTypes from "prop-types";
import styles from "../styles/Comment.module.css";
import calculate from "../calculateDate";
import Icon from "@mdi/react";
import DeleteModal from "./DeleteModal";
import { mdiDotsVertical } from "@mdi/js";
import { useContext, useEffect, useRef, useState } from "react";
import { Data } from "./Page";

const Comment = function({ comment }) {
  const [actionsOpen, setActionsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [commentBody, setCommentBody] = useState(comment.body);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { user } = useContext(Data);
  const actionsModal = useRef(null);
  const actionsButton = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (actionsModal.current && !actionsModal.current.contains(e.target) && !actionsButton.current.contains(e.target)) setActionsOpen(false);
    });
  }, [actionsOpen])

  const handleEdit = async function() {
    const token = localStorage.getItem("token");
    try {
      await fetch(
        import.meta.env.DEV ? `http://localhost:3000/posts/${comment.post}/comments/${comment._id}` : "",
        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`,
          },
          body: JSON.stringify({
            body: commentBody,
          }),
        }
      );
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async function() {
    const token = localStorage.getItem("token");
    try {
      await fetch(
        import.meta.env.DEV ? `http://localhost:3000/posts/${comment.post}/comments/${comment._id}` : "",
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`,
          },
        }
      );
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.comment}>
      <DeleteModal isOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} handleDelete={handleDelete} />
      <div className={styles.top}>
        <div className={styles.left}>
          <p className={styles.username}>{comment.user.username}</p>
          <p className={styles.date}>{calculate(comment.date)}</p>
        </div>
        {actionsOpen &&
          <div className={styles.modal} ref={actionsModal}>
            {user.status === "author" && (
              <>
                <button className={styles.editButton} onClick={() => {
                  setIsEditing(true);
                  setActionsOpen(false);
                }}>Edit</button>
              </>
            )}
            <button className={styles.deleteButton} onClick={() => {
              setDeleteModalOpen(true);
              setActionsOpen(false);
            }}>Delete</button>
          </div>
        }
        {user && (user._id === comment.user._id || user.status === "author") && <Icon
        className={styles.actionsButton}
          ref={actionsButton}
          path={mdiDotsVertical}
          size={1}
          onClick={() => setActionsOpen(actionsOpen => !actionsOpen)}
        />}
      </div>
      {isEditing ? (
        <>
          <input onChange={(e) => setCommentBody(e.target.value)} value={commentBody}></input>
          <button className={styles.cancelEdit} onClick={() => {
            setCommentBody(comment.body);
            setIsEditing(false);
          }}>Cancel</button>
          <button className={styles.saveEdit} onClick={handleEdit} disabled={commentBody === comment.body || commentBody === ""}>Save</button>
        </>
      ) : <p className={styles.body}>{comment.body}</p>
      }
    </div>
  )
};

Comment.propTypes = {
  comment: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }),
    date: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    post: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  })
}

export default Comment;
