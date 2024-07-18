import { useContext } from "react";
import DraftPreview from "./DraftPreview";
import { AuthorContext } from "./AuthorPage";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import styles from "../styles/DraftList.module.css";

const DraftList = function () {
  const { posts } = useContext(AuthorContext);

  return (
    <>
      <div className={styles.top}>
        <h1 className={styles.title}>Your posts</h1>
        <Link to="/author/create" className={styles.link}>
          <button className={styles.button}>
            <Icon path={mdiPlus} size={1} />
            New post
          </button>
        </Link>
      </div>
      <hr />
      <div className={styles.list}>
        {posts.map((post) => (
          <div key={post._id}>
            <DraftPreview post={post} />
          </div>
        ))}
      </div>
    </>
  );
};

export default DraftList;
