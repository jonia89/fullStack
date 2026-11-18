import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
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

  const handleDeleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.destroy(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        setErrorMessage("blog deleted");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
      else {
        console.log("nii")
      }
    } catch {
      console.error();
    }
  };

  return !user ? (
    <Login
      setUser={setUser}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
    />
  ) : (
    <div>
      <h2>Blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <h2>create new</h2>
      <h1 style={{ color: "green" }}>{errorMessage}</h1>
      <BlogForm
        blogs={blogs}
        setBlogs={setBlogs}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleDeleteBlog={() => handleDeleteBlog(blog)}
          />
        ))}
    </div>
  );
};

export default App;
