import { useState } from "react"; 
import { useNavigate } from "react-router-dom";

const Login = function () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      navigate("/blog");
      window.location.reload();
    } catch (err) {
      setUsername("");
      setPassword("");
      setError("Invalid username or password.")
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
