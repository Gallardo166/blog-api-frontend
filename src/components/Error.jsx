import { useRouteError } from "react-router-dom";

const Error = function() {
  const error = useRouteError();
  
  return(
    <>
      {error.status === 404 ? <p>Are you lost?</p> : <p>{error.message}</p>}
    </>
  )
};

export default Error;