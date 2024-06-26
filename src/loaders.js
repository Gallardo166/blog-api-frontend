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
  }
};

export { pageLoader, blogLoader, postLoader }