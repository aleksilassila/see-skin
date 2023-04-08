import request, { SuperAgentTest } from "supertest";
import app from "../app";

const agent = request.agent(app);

export const logIn = async (agent: SuperAgentTest) => {
  return agent
    .post("/api/auth/local")
    .query({
      username: "test",
      password: "test",
    })
    .expect("Set-Cookie", /connect\.sid=.+; Path=\/; HttpOnly/)
    .expect(200);
};

beforeAll(async () => {
  await logIn(agent);
});

describe("/auth/local", () => {
  it("Should be able logged in", async () => {
    const response = await agent.get("/api/auth/verify").expect(200);
    console.log("Logged in as", response.body.id);
  });
});
