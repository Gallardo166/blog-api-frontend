import PropTypes from "prop-types";

const Comment = function({ comment }) {
  return (
    <div>
      <p>{comment.user.username}</p>
      <p>{comment.body}</p>
    </div>
  )
};

Comment.propTypes = {
  comment: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
    body: PropTypes.string.isRequired,
  })
}

export default Comment;
