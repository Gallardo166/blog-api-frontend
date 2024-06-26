import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = function () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async function (e) {
    e.preventDefault();
    try {
      const response = await fetch(
        import.meta.env.DEV ? "http://localhost:3000/users" : "",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            confirmPassword,
          }),
        }
      );
      const resJson = await response.json();
      if (resJson.errors) {
        setPassword("");
        setConfirmPassword("");
        setErrors(resJson.errors);
        return;
      }
      navigate("/login");
    } catch (err) {
      console.log(err);
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
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors && errors.map((error) => <p key={error.msg}>{error.msg}</p>)}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
