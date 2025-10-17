const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Test blog",
    author: "J.S. Tester",
    url: "http://testi1.html",
    likes: 1,
  },
  {
    title: "Another Test blog",
    author: "J.S. Tester",
    url: "http://testi2.html",
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test.only("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
test.only("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, initialBlogs.length);
});
test.only("blogs have id", async () => {
  const response = await api.get("/api/blogs");
  // console.log(response.body[0].id)
  // console.log(response.body[1].id)
  response.body.forEach((blog) => {
    assert(blog.id);
    assert(!blog._id);
  });
});
test.only("blog can be added", async () => {
  const newBlog = {
    title: "New Test blog",
    author: "J.S. Tester",
    url: "http://testi3.html",
    likes: 3,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, initialBlogs.length + 1);

  const titles = response.body.map((blog) => blog.title);
  assert(titles.includes("New Test blog"));
});
test.only("likes default is 0", async () => {
  const blogNotLiked = {
    title: "Not Liked blog",
    author: "J.S. Tester",
    url: "http://testi0.html",
  };
  const response = await api
    .post("/api/blogs")
    .send(blogNotLiked)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});
test.only("missing title or url", async () => {
  const invalidBlog = {
    author: "J.S. Tester",
    likes: 0,
  };
  const response = await api
    .post("/api/blogs")
    .send(invalidBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});
test.only("blog can be deleted", async () => {
  const currentBlogs = await api.get("/api/blogs");
  const blogToDelete = currentBlogs.body[0];
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  const blogsAfterDelete = await api.get("/api/blogs");
  assert.strictEqual(blogsAfterDelete.body.length, initialBlogs.length - 1);
  const titles = blogsAfterDelete.body.map((blog) => blog.title);
  assert(!titles.includes(blogToDelete.title));
});
test.only("likes can increase", async () => {
  const currentBlogs = await api.get("/api/blogs");
  const blogToUpdate = currentBlogs.body[0];
  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 5,
  };
  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);
    assert.strictEqual(response.body.likes, blogToUpdate.likes + 5);
});

after(async () => {
  await mongoose.connection.close();
});
