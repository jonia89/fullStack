import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ blogs, setBlogs, setErrorMessage }) => {
  const [visible, setVisible] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({
        title: blogTitle,
        author,
        url: blogUrl,
      });
      setBlogs([...blogs, newBlog]);
      setAuthor("");
      setBlogTitle("");
      setBlogUrl("");
      toggleVisibility()
      setErrorMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch {
      console.error();
    }
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return !visible ? (
    <button onClick={toggleVisibility}>create new blog</button>
  ) : (
    <form onSubmit={handleCreateBlog}>
      <div>
        <label>
          title:
          <input
            type="text"
            value={blogTitle}
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url:
          <input
            type="text"
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </label>
      </div>
      <div>
        <button type="submit">create</button>
      </div>
      <button onClick={toggleVisibility}>cancel</button>
    </form>
  );
};

export default BlogForm;
