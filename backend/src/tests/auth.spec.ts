import request from "supertest";
import app from "../app";

describe("/auth/local", () => {
  it("Should get authentication cookie", async () => {
    const response = await request(app)
      .post("/api/auth/local")
      .query({
        username: "test",
        password: "test",
      })
      .expect("Set-Cookie", /connect\.sid=.+; Path=\/; HttpOnly/)
      .expect(200);
    expect(true).toBe(true);
  });
});
