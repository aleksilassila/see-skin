import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  let cookie: any = null;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/ (GET)", () => {
    const response = request(app.getHttpServer())
      .post("/auth/local")
      .send({
        username: "test",
        password: "test",
      })
      .set("Accept", "application/json; charset=utf-8")
      .expect(200);
    // .end((err, res) => {
    //   cookie = res.headers["set-cookie"];
    // });
    console.log(cookie);
    // const response = request(app.getHttpServer()).get("/products").expect(200);

    // console.log(response.then((res) => console.log(res.body)));

    return response;
  });
});
