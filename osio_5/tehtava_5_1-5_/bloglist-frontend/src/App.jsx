import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  return !user ? (
    <Login
      setUser={setUser}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
    />
  ) : (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog user={user.name} key={blog.id} blog={blog} handleLogout={handleLogout} />
      ))}
    </div>
  );
};

export default App;
