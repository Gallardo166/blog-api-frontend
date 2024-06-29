import throwError from "./throwError";

const pageLoader = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {  
      const response = await fetch(
        import.meta.env.DEV ? "http://localhost:3000/users/user" : null, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`
          },
        }
      );
      throwError(response);
      return response.json();
    } catch (err) {
      console.log(err);
      throw new Error(err + ", please try again.");
    }
  } else {
    return { user: null };
  }
}

const blogLoader = async () => {
  try {
    const response = await fetch(
      import.meta.env.DEV ? "http://localhost:3000/posts" : "",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    throwError(response);
    return response.json();
  } catch (err) {
    console.log(err);
    throw new Error(err + ", please try again.");
  }
};

const postLoader = async ({ params }) => {
  try {
    const response = await fetch(
      import.meta.env.DEV ? `http://localhost:3000/posts/${params.postid}` : "",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    throwError(response);
    return response.json();
  } catch (err) {
    console.log(err);
    throw new Error(err + ", please try again.");
  }
};

const postFormLoader = async () => {
  try {
    const response = await fetch(
      import.meta.env.DEV ? `http://localhost:3000/categories` : "",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    throwError(response);
    return response.json();
  } catch (err) {
    console.log(err);
    throw new Error(err + ". please try again.");
  }
}

export { pageLoader, blogLoader, postLoader, postFormLoader }