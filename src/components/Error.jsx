import { useRouteError } from "react-router-dom";

const Error = function() {
  const error = useRouteError();
  console.log(error);
  return(
    <div>
      <p>Are you lost?</p>
    </div>
  )
};

export default Error;