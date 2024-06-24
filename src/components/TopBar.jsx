import { Link } from "react-router-dom"

const TopBar = function({ handleSidebarOpen }) {
  return(
    <div>
      <button onClick={() => handleSidebarOpen()}>
        <img src="/images/reading-astronaut.png" alt="" width="64px"/>
      </button>
      <Link to="/login"><button>Log In</button></Link>
    </div>
  )
};

export default TopBar;