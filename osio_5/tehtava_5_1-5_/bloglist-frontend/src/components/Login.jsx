import { login } from "../services/login";
import blogService from "../services/blogs";

const Login = ({
  setUser,
  username,
  setUsername,
  password,
  setPassword,
  errorMessage,
  setErrorMessage,
}) => {
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(username, password);
    try {
      const user = await login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:{" "}
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
      <h1 style={{ color: "red" }}>{errorMessage}</h1>
    </div>
  );
};

export default Login;
