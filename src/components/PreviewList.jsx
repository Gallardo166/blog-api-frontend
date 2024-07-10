import Preview from "./Preview";
import PropTypes from "prop-types";
import styles from "../styles/PreviewList.module.css";

const PreviewList = function({ posts }) {
  return (
    <div className={styles.posts}>
      {posts.length > 0 && posts.map((post, index) => (
        <Preview 
          position={((index + 1) % 5) === 1 
            ? "single" : (((index + 1) % 5) === 2 | ((index + 1) % 5) === 4) 
            ? "left" 
            : "right"} 
          key={post._id} 
          post={post} 
        />
      ))}
      {posts.length === 0 && <p>No posts in this category yet.</p>}
    </div>
  )
}

PreviewList.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default PreviewList;