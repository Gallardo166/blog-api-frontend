import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthorContext } from "./AuthorPage";

const DraftPreview = function ({ post }) {
  const { handlePublishDraft, handleUnpublishDraft } = useContext(AuthorContext);

  return (
    <div>
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
  }),
};

export default DraftPreview;
