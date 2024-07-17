import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { AuthorContext } from "./AuthorPage";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";

const DraftPreview = function ({ post }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { handlePublishDraft, handleUnpublishDraft } = useContext(AuthorContext);

  const handleDelete = async function() {
    const token = localStorage.getItem("token");
    try {
      await fetch(
        import.meta.env.DEV ? `http://localhost:3000/posts/${post._id}` : "",
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`
          }
        }
      );
      location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <DeleteModal isOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} handleDelete={handleDelete} />
      <img src={post.imageurl} />
      <div>
        <p>{post.title}</p>
        <p>{post.subheader}</p>
        {post.categories.map((category) => (
          <p key={category._id}>{category.name}</p>
        ))}
        <p>{post.isPublished ? "Published" : "Draft"}</p>
      </div>
      <button
        onClick={() => {
          if (post.isPublished) {
            return handleUnpublishDraft(post);
          }
          handlePublishDraft(post);
        }}
      >
        {post.isPublished ? "Unpublish" : "Publish"}
      </button>
      <Link to={`/author/edit/${post._id}`}>Edit</Link>
      <button onClick={() => {
        setDeleteModalOpen(true);
        }}>Delete</button>
    </div>
  );
};

DraftPreview.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subheader: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      })
    ).isRequired,
    imageurl: PropTypes.string.isRequired,
    isPublished: PropTypes.bool.isRequired,
    _id: PropTypes.string.isRequired,
  }),
};

export default DraftPreview;
