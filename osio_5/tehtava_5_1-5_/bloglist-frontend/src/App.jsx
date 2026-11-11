import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
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

  const handleDeleteBlog = async (id) => {
    try {
      blogService.destroy(id);
    } catch {
      console.error();
    }
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
      <h2>Blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <NewBlog
        blogs={blogs}
        setBlogs={setBlogs}
        blogTitle={blogTitle}
        setBlogTitle={setBlogTitle}
        author={author}
        setAuthor={setAuthor}
        blogUrl={blogUrl}
        setBlogUrl={setBlogUrl}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleDeleteBlog={() => handleDeleteBlog(blog.id)}
        />
      ))}
    </div>
  );
};

export default App;
