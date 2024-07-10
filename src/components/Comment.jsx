import PropTypes from "prop-types";
import styles from "../styles/Comment.module.css";
import calculate from "../calculateDate";

const Comment = function({ comment }) {
  return (
    <div className={styles.comment}>
      <div className={styles.top}>
        <p className={styles.username}>{comment.user.username}</p>
        <p className={styles.date}>{calculate(comment.date)}</p>
      </div>
      <p className={styles.body}>{comment.body}</p>
    </div>
  )
};

Comment.propTypes = {
  comment: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
    date: PropTypes.instanceOf(Date),
    body: PropTypes.string.isRequired,
  })
}

export default Comment;
