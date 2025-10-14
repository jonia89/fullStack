const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.find((blog) => blog.likes === maxLikes);
};

const mostBlogs = (blogs) => {
  const authors = {};

  blogs.forEach((blog) => {
    if (authors[blog.author]) {
      authors[blog.author]++;
    } else {
      authors[blog.author] = 1;
    }
  });
  const topAuthor = Object.keys(authors).reduce((a, b) =>
    authors[a] > authors[b] ? a : b
  );
  return {
    author: topAuthor,
    blogs: authors[topAuthor],
  };
};

const mostLikes = (blogs) => {
    const authors = {};
    
    blogs.forEach((blog) => {
        if (authors[blog.author]) {
            authors[blog.author] += blog.likes;
        } else {
            authors[blog.author] = blog.likes;
        }
    });
    const topAuthor =  Object.keys(authors).reduce((a, b) =>
        authors[a] > authors[b] ? a : b
    );
    return {
        author: topAuthor,
        likes: authors[topAuthor],
    };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
