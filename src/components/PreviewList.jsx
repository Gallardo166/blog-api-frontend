import Preview from "./Preview";
import PropTypes from "prop-types";

const PreviewList = function({ posts }) {
  return (
    <div>
      {posts.length > 0 && posts.map((post) => (
        <Preview key={post._id} post={post} />
      ))}
      {posts.length === 0 && <p>No posts in this category yet.</p>}
    </div>
  )
}

PreviewList.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default PreviewList;