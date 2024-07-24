import { useNavigate } from "react-router-dom";
import calculate from "../calculateDate";
import styles from "../styles/CommentPreview.module.css";
import PropTypes from "prop-types";

const CommentPreview = function({ comment }) {
  const navigate = useNavigate();
  return (
  <div onClick={() => navigate(`/blog/${comment.post._id}`)} className={styles.container} to={`/blog/${comment.post._id}`} key={comment._id}>
    <p className={styles.top}>{calculate(comment.date)} &middot; {comment.post.title}</p>
    <p className={styles.bottom}>{comment.body}</p>
  </div>
  )
}

CommentPreview.propTypes = {
  comment: PropTypes.shape({
    post: PropTypes.shape({
      title: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }),
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
};

export default CommentPreview;