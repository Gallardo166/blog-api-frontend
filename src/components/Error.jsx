import { Link, useRouteError } from "react-router-dom";

const Error = function() {
  const error = useRouteError();
  console.log(error.message);
  
  return(
    <>
      {error.status === 404 && <p>Are you lost?</p>}
      {error && <p>{error.message}</p>}
      <Link to="/">Go to home page</Link>
    </>
  )
};

export default Error;