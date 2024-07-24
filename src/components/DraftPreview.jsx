import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { AuthorContext } from "./AuthorPage";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import Icon from "@mdi/react";
import { mdiPencil, mdiDelete } from "@mdi/js";
import styles from "../styles/DraftPreview.module.css";

const DraftPreview = function ({ post }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { handlePublishDraft, handleUnpublishDraft } =
    useContext(AuthorContext);

  const handleDelete = async function () {
    const token = localStorage.getItem("token");
    try {
      await fetch(
        import.meta.env.DEV ? `http://localhost:3000/posts/${post._id}` : "",
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <DeleteModal
        isOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        handleDelete={handleDelete}
      />
      <div className={styles.container}>
        <div className={styles.top}>
          <Link className={styles.imageContainer} to={`/blog/${post._id}`}><img className={styles.image} src={post.imageurl} /></Link>
          <div>
            <div className={styles.categories}>
              {post.categories.map((category) => (
                <p className={styles.category} key={category._id}>
                  {category.name}
                </p>
              ))}
            </div>
            <h2 className={styles.title}>{post.title}</h2>
            <p className={styles.subheader}>{post.subheader}</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <p>{post.isPublished ? "Published" : "Draft"}</p>
            <button
              className={
                post.isPublished ? styles.unpublishButton : styles.publishButton
              }
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
          <div className={styles.right}>
            <Link to={`/author/edit/${post._id}`}>
              <button className={styles.editButton}>
                <Icon path={mdiPencil} size={1} />
              </button>
            </Link>
            <button
              className={styles.deleteButton}
              onClick={() => {
                setDeleteModalOpen(true);
              }}
            >
              <Icon path={mdiDelete} size={1} />
            </button>
          </div>
        </div>
      </div>
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
