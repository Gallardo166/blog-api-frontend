import throwError from "./throwError";

const pageLoader = async () => {
  const token = localStorage.getItem("token");
  let user = null;
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
      const resJson =  await response.json();
      user = resJson.user;
    } catch (err) {
      console.log(err);
      throw new Error(err + ", please try again.");
    }
  }
  try {
    const response = await fetch(
      import.meta.env.DEV ? "http://localhost:3000/categories" : null, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    throwError(response);
    return {...{user}, ...await response.json()}
  } catch (err) {
    console.log(err);
    throw new Error(err + ", please try again.")
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
    const [postResponse, commentsResponse] = await Promise.all([
      fetch(
        import.meta.env.DEV ? `http://localhost:3000/posts/${params.postid}` : "",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          }
        }
      ),
      fetch(
        import.meta.env.DEV ? `http://localhost:3000/posts/${params.postid}/comments` : "",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          }
        }
      ),
    ]);
    throwError(postResponse);
    throwError(commentsResponse);
    return {...await postResponse.json(), ...await commentsResponse.json()};
  } catch (err) {
    console.log(err);
    throw new Error(err + ", please try again.");
  }
};

export { pageLoader, blogLoader, postLoader }