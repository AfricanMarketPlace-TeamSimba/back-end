const request = require("supertest"); // calling it "request" is a common practice
const db = require("../database/connections.js");
const server = require("./server.js");

test("sanity", () => {
  expect(3).toEqual(3);
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("users").truncate();
});
afterAll(async () => {
  await db.destroy();
});

const rob = {
  first_name: "rob",
  last_name: "h",
  email: "rh1@gmail.com",
  username: "rh",
  password: "1234",
  country: "usa",
  user_role: false,
};
const sean = {
  first_name: "sean",
  last_name: "t",
  email: "st1@gmail.com",
  username: "st",
  password: "1234",
  country: "usa",
  user_role: false,
};

describe("[POST] /api/auth/register", () => {
  it("responds with the newly registered user", async () => {
    let res;
    res = await request(server).post("/api/auth/register").send(rob);
    expect(res.body).toMatchObject({ id: 1, ...rob });

    res = await request(server).post("/api/auth/register").send(sean);
    expect(res.body).toMatchObject({ id: 2, ...sean });
  });
});
