const Blog = ({ user, blog, handleLogout }) => (
  (<div>
    <p>{user} logged in <button onClick={handleLogout}>logout</button></p>
    {blog.title} {blog.author}
  </div>)
);

export default Blog;
