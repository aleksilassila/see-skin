import { logIn } from "./auth.spec";
import app from "../app";
import request from "supertest";
import prisma from "../prisma";

const agent = request.agent(app);

const explicitlyAddedIrritantIds = ["clcnfoarx000et05v3izsejy7"];
const irritatingProductIds = [
  "clcnfomkl0n8et05v2nnm29fv",
  "clcnfoowd0n9wt05v1lvtgywx",
  "clcnfos960nast05vauvhd9qc",
];

beforeAll(async () => {
  await logIn(agent);
  await prisma.user
    .update({
      where: {
        id: "test",
      },
      data: {
        skinProfile: {
          delete: true,
        },
      },
    })
    .catch(() => {});
});
describe("/user", () => {
  it("Shouldn't have skin profile", async () => {
    const response = await agent
      .get("/api/user")
      .expect((res) => {
        expect(res.body.skinProfile).toBeNull();
      })
      .expect(200);
  });
  it("Should be able to calculate irritants", async () => {
    await agent
      .get("/api/user/calculate-irritants")
      .query(
        explicitlyAddedIrritantIds
          .map((id) => `ingredientIds[]=${id}`)
          .concat(irritatingProductIds.map((id) => `productIds[]=${id}`))
          .join("&")
      )
      .query({
        skinType: "DRY",
      })
      .expect(200);
  });
  it("Should now have skin profile", async () => {
    await agent
      .get("/api/user")
      .expect((res) => {
        // console.log("Response body: ", res.body);

        const skinProfile = res.body.skinProfile;
        expect(skinProfile).not.toBeNull();
        expect(skinProfile.skinType).toBe("DRY");
        expect(skinProfile.explicitlyAddedIrritants).toHaveLength(1);
        expect(skinProfile.explicitlyAddedProductIrritants).toHaveLength(3);
        expect(skinProfile.duplicateIrritants.length).toBeGreaterThan(0);
        expect(skinProfile.skinTypeClassIrritants).toHaveLength(1);
      })
      .expect(200);
  });
  it("Should be able to update skin profile", async () => {
    await agent
      .get("/api/user/calculate-irritants")
      .query({
        skinType: "NORMAL",
      })
      .expect(200);

    await agent
      .get("/api/user")
      .expect((res) => {
        const skinProfile = res.body.skinProfile;
        expect(skinProfile).not.toBeNull();
        expect(skinProfile.skinType).toBe("NORMAL");
        expect(skinProfile.explicitlyAddedIrritants).toHaveLength(0);
        expect(skinProfile.explicitlyAddedProductIrritants).toHaveLength(0);
        expect(skinProfile.duplicateIrritants).toHaveLength(0);
        expect(skinProfile.skinTypeClassIrritants).toHaveLength(0);
      })
      .expect(200);
  });
});
