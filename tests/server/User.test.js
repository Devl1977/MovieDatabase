const request = require("supertest");
const app = require("../../backend/index"); // Main server file
const mongoose = require("mongoose");

describe("User API Tests", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/test-db");
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("GET /api/v1/user - Fetch all users", async () => {
    const response = await request(app).get("/api/v1/user");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("users");
  });

  test("POST /api/v1/user - Create a new user", async () => {
    const newUser = { name: "Test User", email: "test@example.com" };
    const response = await request(app)
      .post("/api/v1/user")
      .send(newUser)
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.user).toHaveProperty("_id");
  });
});
