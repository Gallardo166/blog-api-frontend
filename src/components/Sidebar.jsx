import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import styles from "../styles/Sidebar.module.css";

const Sidebar = function ({ user, categories, handleSidebarOpen, sidebarOpen }) {
  const handleClick = async function () {
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
    <nav className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}>
      <button className={styles.closeButton} onClick={() => handleSidebarOpen(false)}><Icon path={mdiClose} size={1.2} /></button>
      <div className={styles.sidebarContainer}>
        <Link to={user ? "/blog" : "/"} onClick={() => handleSidebarOpen(false)}>Home</Link>
        <p className={styles.categories}>Categories:</p>
        <div className={styles.categoriesContainer}>
          {categories &&
            categories.map((category) => (
              <Link key={category._id} to={`/blog/categories/${category._id}`} onClick={() => handleSidebarOpen(false)}>
                {category.name}
              </Link>
            ))}
        </div>
        <Link to="/about" onClick={() => handleSidebarOpen(false)}>About</Link>
        {user ? (
          <>
            <Link to={`/profile/${user._id}`} onClick={() => handleSidebarOpen(false)}>Profile</Link>
            <button onClick={(e) => {
              handleClick(e);
              handleSidebarOpen();
            }}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => handleSidebarOpen(false)}>Log In</Link>
            <Link to="/signup" onClick={() => handleSidebarOpen(false)}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

Sidebar.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ),
  handleSidebarOpen: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
