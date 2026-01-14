const Blog = ({ user, blog }) => (
  <div>
    <p>{user}</p>
    {blog.title} {blog.author}
  </div>
);

export default Blog;
