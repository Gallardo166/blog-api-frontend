import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Preview = function({ post }) {
  const navigate = useNavigate();
  console.log(post);

  return(
    <div onClick={() => {
      navigate(`/blog/${post._id}`);
    }}>
      <img src={post.imageurl} alt="" width="140px" />
      <p>{post.title}</p>
      <p>{post.subheader}</p>
      {post.categories.map((category) => (
        <p key={category._id}>{category.name}</p>
      ))}
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
  })
};

export default Preview;