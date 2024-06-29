import { useRouteError } from "react-router-dom";

const Error = function() {
  const error = useRouteError();
  
  return(
    <>
      {error ? <p>{error.message}</p>: <p>Are you lost?</p>}
    </>
  )
};

export default Error;