import { logIn } from "./auth.spec";
import app from "../app";
import request from "supertest";
import prisma from "../prisma";
import { Product } from "@prisma/client";

const agent = request.agent(app);

const explicitlyAddedIrritantIdToProductId: { [key: string]: string } = {
  clcnfobgw03tit05v9zm405cv: "clcnfolfu0n7yt05v10g13103",
};
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
  it("Should be able to create a SkinProfile and calculate irritants", async () => {
    await agent
      .get("/api/user/create-skin-profile")
      .query(
        Object.keys(explicitlyAddedIrritantIdToProductId)
          .map((id) => `ingredientIds[]=${id}`)
          .concat(irritatingProductIds.map((id) => `productIds[]=${id}`))
          .join("&")
      )
      .query({
        skinType: "DRY",
      })
      .expect(200);
  });
  it("Did create skinProfile", async () => {
    await agent
      .get("/api/user")
      .expect((res) => {
        const skinProfile = res.body.skinProfile;
        expect(skinProfile).not.toBeNull();
        expect(skinProfile.skinType).toBe("DRY");
        expect(skinProfile.explicitlyAddedIrritants).toHaveLength(1);
        expect(skinProfile.explicitlyAddedProducts).toHaveLength(3);
        expect(skinProfile.duplicateIrritants.length).toBeGreaterThan(0);
        expect(skinProfile.skinTypeClassIrritants).toHaveLength(1);
      })
      .expect(200);
  });
  it("Should get correct feed", async () => {
    await agent
      .get("/api/products/feed")
      .query({
        name: "",
        filterIrritants: true,
        take: 25,
      })
      .expect((res) => {
        const receivedProductIds = res.body.map((i: Product) => i.id);
        const explicitProductIrritants = Object.values(
          explicitlyAddedIrritantIdToProductId
        );

        irritatingProductIds.forEach((id) => {
          expect(receivedProductIds).not.toContain(id);
        });

        explicitProductIrritants.forEach((id) => {
          expect(receivedProductIds).not.toContain(id);
        });

        console.log(receivedProductIds);
      });
    // await agent
    //   .get("/api/products/feed")
    //   .query({
    //     name: "",
    //     filterIrritants: false,
    //     take: 25,
    //   })
    //   .expect((res) => {
    //     const receivedProductIds = res.body.map((i: Product) => i.id);
    //     const explicitProductIrritants = Object.values(
    //       explicitlyAddedIrritantIdToProductId
    //     );
    //
    //     irritatingProductIds.forEach((id) => {
    //       expect(receivedProductIds).toContain(id);
    //     });
    //
    //     explicitProductIrritants.forEach((id) => {
    //       expect(receivedProductIds).toContain(id);
    //     });
    //
    //     console.log(receivedProductIds);
    //   });
  });
  it("Should be able to update skin profile", async () => {
    await agent
      .get("/api/user/create-skin-profile")
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
        expect(skinProfile.explicitlyAddedProducts).toHaveLength(0);
        expect(skinProfile.duplicateIrritants).toHaveLength(0);
        expect(skinProfile.skinTypeClassIrritants).toHaveLength(0);
      })
      .expect(200);
  });
});
