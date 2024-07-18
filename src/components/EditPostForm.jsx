import { Link, useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import { Data } from "./Page";

const EditPostForm = function () {
  const { post } = useLoaderData();
  const { categories } = useContext(Data);
  const [title, setTitle] = useState(post.title);
  const [subheader, setSubheader] = useState(post.subheader);
  const [body, setBody] = useState(post.body);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(
    post.categories.map((category) => category._id)
  );

  const handleToggleCheckbox = function (e) {
    if (e.target.checked)
      return setSelectedCategories([...selectedCategories, e.target.value]);
    const newSelectedCategories = selectedCategories.filter(
      (category) => category !== e.target.value
    );
    setSelectedCategories([...newSelectedCategories]);
  };

  const handleSubmit = async function (action) {
    setLoading(true);
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("title", title);
    data.append("subheader", subheader);
    data.append("body", body);
    data.append("categories", JSON.stringify(selectedCategories));
    if (action === "publish") {
      data.append("isPublished", true);
      data.append("publishDate", Date.now());
    }
    if (post.isPublished) data.append("editDate", Date.now());
    data.append("image", file);
    try {
      const response = await fetch(
        import.meta.env.DEV ? `http://localhost:3000/posts/${post._id}` : "",
        {
          method: "PUT",
          mode: "cors",
          headers: {
            Authorization: `bearer ${token}`,
          },
          body: data,
        }
      );
      const resJson = await response.json();
      if (resJson.errors) {
        setTitle("");
        setSubheader("");
        setBody("");
        setErrors(resJson.errors);
        return;
      }
      setLoading(false);
      location.replace("/author");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form
          onSubmit={(e) => {
            console.log(e);
            e.preventDefault();
            handleSubmit(e.nativeEvent.submitter.id);
          }}
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="subheader">Subheader</label>
          <input
            type="text"
            name="subheader"
            id="subheader"
            value={subheader}
            onChange={(e) => setSubheader(e.target.value)}
          />
          <label htmlFor="body">Body</label>
          <textarea
            name="body"
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <fieldset>
            <legend>Categories:</legend>
            {categories.map((category) => (
              <div key={category._id}>
                <input
                  checked={selectedCategories.includes(category._id)}
                  type="checkbox"
                  name="categories"
                  id={category.name}
                  value={category._id}
                  onChange={(e) => handleToggleCheckbox(e)}
                />
                <label htmlFor={category.name}>{category.name}</label>
              </div>
            ))}
          </fieldset>
          {errors && errors.map((error) => <p key={error.msg}>{error.msg}</p>)}
          <Link to="/author">
            <button type="button">Cancel</button>
          </Link>
          <button type="submit" id="save">
            Save
          </button>
          {!post.isPublished && (
            <button type="submit" id="publish">
              Save and Publish
            </button>
          )}
        </form>
      )}
    </>
  );
};

export default EditPostForm;
