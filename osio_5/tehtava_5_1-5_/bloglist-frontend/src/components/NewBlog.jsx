import blogService from "../services/blogs";

const NewBlog = ({
  blogs,
  setBlogs,
  blogTitle,
  setBlogTitle,
  author,
  setAuthor,
  blogUrl,
  setBlogUrl,
  errorMessage,
  setErrorMessage,
}) => {
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
      setErrorMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch {
      console.error();
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <h1 style={{ color: "green" }}>{errorMessage}</h1>
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
      </form>
    </div>
  );
};

export default NewBlog;
