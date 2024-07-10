import CommentSection from "./CommentSection";
import { useLoaderData } from "react-router-dom";
import styles from "../styles/Post.module.css";

const Post = function() {
  const { post, comments } = useLoaderData();
  
  return(
    <section className={styles.post}>
      <div className={styles.postContainer}>
        <div>
          <h1 className={styles.title}>{post.title}</h1>
          <h2 className={styles.subheader}>{post.subheader}</h2>
        </div>
        <img className={styles.image} src={post.imageurl} alt="" width="320px" />
        <p className={styles.body}>{post.body}</p>
      </div>
      <CommentSection postid={post._id} comments={comments} />
    </section>
  )
}

export default Post;