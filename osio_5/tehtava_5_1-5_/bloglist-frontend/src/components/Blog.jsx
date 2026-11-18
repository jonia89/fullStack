import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, handleDeleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async (id) => {
    setLikes(likes + 1);
    await blogService.update(id, {
      ...blog,
      likes: likes + 1,
    });
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{!visible ? "view" : "hide"}</button>
      <button onClick={handleDeleteBlog}>delete</button>
      {visible ? (
        <div>
          <div>{blog.url}</div>
          <div>
            likes: {likes} <button onClick={() => handleLike(blog.id)}>like</button>
          </div>
          <div>{blog.user.username}</div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Blog;
