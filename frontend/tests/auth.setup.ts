import { test as setup, expect } from "@playwright/test";
import axios from "axios";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ request, context }) => {
  console.log(
    await request.post("http://localhost/api/auth/local", {
      data: {
        username: "test",
        password: "test",
      },
    })
  );

  // Delete old account
  console.log(await request.delete("http://localhost/api/user"));

  // await request.delete("http://localhost/api/skin-profile");

  const response = await request.post("http://localhost/api/auth/local", {
    data: {
      username: "test",
      password: "test",
    },
  });

  console.log(response);

  await request.storageState({ path: authFile });
});
