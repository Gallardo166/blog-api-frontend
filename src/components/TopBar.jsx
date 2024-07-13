import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Data } from "./Page";
import { forwardRef, useContext } from "react";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import styles from "../styles/TopBar.module.css";

const TopBar = forwardRef(function TopBar({ handleSidebarOpen }, ref) {
  const { user } = useContext(Data);

  const handleClick = async function () {
    console.log("test");
    try {
      await fetch(import.meta.env.DEV ? "http://localhost:3000/logout" : "", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.removeItem("token");
      location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section
      ref={ref}
      className={styles.topBar}
      onClick={() => handleSidebarOpen(false)}
    >
      <button
        className={styles.openButton}
        onClick={(e) => {
          e.stopPropagation();
          handleSidebarOpen(true);
        }}
      >
        <Icon
          path={mdiMenu}
          size={1.2}
          onClick={(e) => {
            e.stopPropagation();
            handleSidebarOpen(true);
          }}
        />
      </button>
      <Link
        className={styles.mainLogo}
        to={user ? (user.status === "author" ? "/author" : "/blog") : "/"}
      >
        <img src="/images/reading-astronaut.png" alt="" width="56px" />
      </Link>
      {user ? (
        <Link to="/" onClick={handleClick}>
          <button className={styles.logOutButton}>
            Log Out
          </button>
        </Link>
      ) : (
        <Link to="/login">
          <button className={styles.logInButton}>Log In</button>
        </Link>
      )}
    </section>
  );
});

TopBar.propTypes = {
  handleSidebarOpen: PropTypes.func.isRequired,
};

export default TopBar;
