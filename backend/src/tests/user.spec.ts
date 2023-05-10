import { logIn } from "./auth.spec";
import app from "../app";
import request from "supertest";
import { Product } from "@prisma/client";
import prisma from "../prisma";

const agent = request.agent(app);

const filteredProductsAmount = 2;
const filteredIngredientsAmount = 1;

const filteredProductIds: string[] = [];
const filteredIngredientIdsToProductId: { [key: string]: string } = {};

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

  await generateTestingData();
});
describe("/user", () => {
  it("User should not have skinProfile", async () => {
    await agent
      .get("/api/user")
      .expect((res) => {
        expect(res.body.skinProfile).toBeNull();
      })
      .expect(200);
  });
  it("Should be able to create a SkinProfile and calculate irritants", async () => {
    await agent
      .put("/api/skin-profile")
      .query(
        Object.keys(filteredIngredientIdsToProductId)
          .map((id) => `ingredientIds[]=${id}`)
          .concat(filteredProductIds.map((id) => `productIds[]=${id}`))
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
        expect(skinProfile.explicitlyAddedIrritants).toHaveLength(
          filteredIngredientsAmount
        );
        expect(skinProfile.explicitlyAddedProducts).toHaveLength(
          filteredProductsAmount
        );
        expect(skinProfile.duplicateIrritants.length).toBeGreaterThan(0);
        // expect(skinProfile.skinTypeClassIrritants).toHaveLength(1);
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
          filteredIngredientIdsToProductId
        );

        filteredProductIds.forEach((id) => {
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
      .put("/api/skin-profile")
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

async function generateTestingData() {
  await agent
    .get("/api/products/feed")
    .query({
      name: "",
      filterIrritants: true,
      take: 25,
    })
    .then((res) => res.body)
    .then(async (body: Product[]) => {
      if (body.length < 2) {
        throw new Error("Too few products to test");
      }

      let i = 0;

      for (i; i < filteredProductsAmount; i++) {
        filteredProductIds.push(body[i].id);
      }

      for (i; i < body.length; i++) {
        const ingredient = await prisma.ingredient.findFirst({
          where: {
            products: {
              some: {
                id: body[i].id,
              },
            },
          },
        });

        if (ingredient) {
          filteredIngredientIdsToProductId[ingredient.id] = body[i].id;
        }

        if (
          Object.keys(filteredIngredientIdsToProductId).length ===
          filteredIngredientsAmount
        ) {
          break;
        }
      }
    });
}
