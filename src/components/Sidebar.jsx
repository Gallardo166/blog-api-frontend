import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Sidebar = function ({ user, categories }) {

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

  return (
    <nav>
      <Link to={user ? "/blog" : "/"}>Home</Link>
      <Link to="/categories">Categories</Link>
      {categories &&
        categories.map((category) => (
          <Link key={category._id} to={`/blog/categories/${category._id}`}>{category.name}</Link>
        ))}
      <Link to="/about">About</Link>
      {user ? <button onClick={(e) => handleClick(e)}>Log Out</button> : <><Link to="/login">Log In</Link><Link to="/signup">Sign Up</Link></>}
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
};

export default Sidebar;
