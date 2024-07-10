import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Preview.module.css";

const Preview = function({ post, position }) {
  const navigate = useNavigate();

  return(
    <div className={`${position === "single" ? styles.single : position === "left" ? styles.left : styles.right} ${styles.post}`} onClick={() => {
      navigate(`/blog/${post._id}`);
    }}>
      <img className={styles.image} src={post.imageurl} alt="" />
      <div className={styles.text}>
        <h1 className={styles.title}>{post.title}</h1>
        <h2 className={styles.subheader}>{post.subheader}</h2>
      </div>
    </div>
  )
}

Preview.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subheader: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    imageurl: PropTypes.string.isRequired,
  }),
  position: PropTypes.string.isRequired,
};

export default Preview;