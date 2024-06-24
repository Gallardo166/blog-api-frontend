import { Link } from "react-router-dom";

const Home = function() {
  return(
    <>
      <h1>Galaxy Gazette</h1>
      <div>
        <Link to="/signup"><button>Sign Up</button></Link>
        <Link to="/blog">Start reading {">"}</Link>
      </div>
    </>
  )
};

export default Home;