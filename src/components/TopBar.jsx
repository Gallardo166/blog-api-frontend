import { Link } from "react-router-dom"
import PropTypes from "prop-types";
import { Data } from "./Page";
import { useContext } from "react";

const TopBar = function({ handleSidebarOpen }) {
  const { user } = useContext(Data);

  const handleClick = async function() {
    try {
      await fetch(
        import.meta.env.DEV ? "http://localhost:3000/logout" : "",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      localStorage.removeItem("token");
      location.replace("/");
    } catch (err) {
      console.log(err);
    }
  }

  return(
    <div>
      <button onClick={() => handleSidebarOpen()}>
        <img src="/images/menu.svg" alt="" width="64px" />
      </button>
      <Link>
        <img src="/images/reading-astronaut.png" alt="" width="64px"/>
      </Link>
      {user ? <Link><button onClick={handleClick}>Log Out</button></Link> : <Link to="/login"><button>Log In</button></Link>}
    </div>
  )
};

TopBar.propTypes = {
  handleSidebarOpen: PropTypes.func.isRequired,
};

export default TopBar;