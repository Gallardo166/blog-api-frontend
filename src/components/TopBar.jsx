import { Link } from "react-router-dom"
import PropTypes from "prop-types";
import { Data } from "./Page";
import { useContext } from "react";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import styles from "../styles/TopBar.module.css";

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
    <section className={styles.topBar}>
      <button className={styles.openButton} onClick={handleSidebarOpen}>
        <Icon path={mdiMenu} size={1.2} />
      </button>
      <Link className={styles.mainLogo} to={user ? "/blog" : "/"}>
        <img src="/images/reading-astronaut.png" alt="" width="56px"/>
      </Link>
      {user ? <Link><button className={styles.logOutButton} onClick={handleClick}>Log Out</button></Link> : <Link to="/login"><button className={styles.logInButton}>Log In</button></Link>}
    </section>
  )
};

TopBar.propTypes = {
  handleSidebarOpen: PropTypes.func.isRequired,
};

export default TopBar;