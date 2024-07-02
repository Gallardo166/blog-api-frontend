import { Link } from "react-router-dom";
import { Data } from "./Page";
import { useContext } from "react";

const Home = function() {
  const { user } = useContext(Data);

  return(
    <section>
      <h1>Galaxy Gazette</h1>
      <div>
        {!user &&  <Link to="/signup"><button>Sign Up</button></Link>}
        <Link to="/blog">Start reading {">"}</Link>
      </div>
    </section>
  )
};

export default Home;