const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const api = supertest(app);

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });
  test("creation succeeds with a valid fresh username and valid password", async () => {
    const usersAtStart = await User.find({});
    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await User.find({});
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
  test("creation fails with non-unique username", async () => {
    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };
    await api.post("/api/users").send(newUser);
    const result = await api.post("/api/users").send(newUser).expect(400);
    assert(result.body.error.includes("unique"));
  });
  test("creation fails when username is too short", async () => {
    const newUser = {
      username: "ml",
      name: "Matti Luukkainen",
      password: "salainen",
    };
    await api.post("/api/users").send(newUser).expect(400);
  });
  test("creation fails when password is too short", async () => {
    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "sa",
    };
    await api.post("/api/users").send(newUser).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
