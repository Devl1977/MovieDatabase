const request = require("supertest");
const app = require("../../backend/index"); // Main server file
const mongoose = require("mongoose");

describe("Movie API Tests", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/test-db");
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("GET /api/v1/movie - Fetch all movies", async () => {
    const response = await request(app).get("/api/v1/movie");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("movies");
  });

  test("POST /api/v1/movie - Create a new movie", async () => {
    const newMovie = {
      title: "Test Movie",
      release_date: "2024-01-01",
      genre_ids: [28, 12],
      overview: "A test movie overview.",
    };
    const response = await request(app)
      .post("/api/v1/movie")
      .send(newMovie)
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.movie).toHaveProperty("_id");
  });
});
