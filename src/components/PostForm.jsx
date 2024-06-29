import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const PostForm = function () {
  const [title, setTitle] = useState("");
  const [subheader, setSubheader] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { categories } = useLoaderData();

  console.log(selectedCategories);
  const handleToggleCheckbox = function(e) {
    if (e.target.checked) return setSelectedCategories([...selectedCategories, e.target.value]);
    const newSelectedCategories = selectedCategories.filter((category) => category !== e.target.value);
    setSelectedCategories([...newSelectedCategories]);
  };

  const handleSubmit = async function(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("title", title);
    data.append("subheader", subheader);
    data.append("body", body);
    data.append("categories", JSON.stringify(selectedCategories));
    data.append("isPublished", false);
    data.append("image", file);
    try {
      const response = await fetch(
        import.meta.env.DEV ? "http://localhost:3000/posts" : "",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Authorization": `bearer ${token}`,
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="title">Title</label>
      <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label htmlFor="subheader">Subheader</label>
      <input type="text" name="subheader" id="subheader" value={subheader} onChange={(e) => setSubheader(e.target.value)} />
      <label htmlFor="body">Body</label>
      <textarea name="body" id="body" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
      <label htmlFor="image">Image</label>
      <input type="file" name="image" id="image" onChange={(e) => setFile(e.target.files[0])} />
      <fieldset>
        <legend>Categories:</legend>
        {categories.map((category) => (
          <div key={category._id}>
            <input type="checkbox" name="categories" id={category.name} value={category._id} onChange={(e) => handleToggleCheckbox(e)} />
            <label htmlFor={category.name}>{category.name}</label>
          </div>
        ))}
      </fieldset>
      {errors && errors.map((error) => <p key={error.msg}>{error.msg}</p>)}
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
