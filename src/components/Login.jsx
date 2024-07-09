import { useState } from "react"; 
import styles from "../styles/Form.module.css";

const Login = function () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async function (e) {
    e.preventDefault();
    try {
      const response = await fetch(
        import.meta.env.DEV ? "http://localhost:3000/login" : "",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      const resJson = await response.json();
      localStorage.setItem("token", resJson.token);
      location.replace("/blog");
    } catch (err) {
      setUsername("");
      setPassword("");
      setError("Invalid username or password.")
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.usernameDiv}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.passwordDiv}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p>{error}</p>}
      <button type="submit" className={styles.button}>Log In</button>
    </form>
  );
};

export default Login;
