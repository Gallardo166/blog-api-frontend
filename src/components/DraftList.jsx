import { useContext } from "react";
import DraftPreview from "./DraftPreview";
import { AuthorContext } from "./AuthorPage";

const DraftList = function() {
  const { posts } = useContext(AuthorContext);

  return (
    <div>
      <h1>Your posts</h1>
      {posts.map((post) => (
        <DraftPreview key={post._id} post={post} />
      ))}
    </div>
  )
}

export default DraftList;