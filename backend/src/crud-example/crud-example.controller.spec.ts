import { Test, TestingModule } from "@nestjs/testing";
import { CrudExampleController } from "./crud-example.controller";
import { CrudExampleService } from "./crud-example.service";

describe("CrudExampleController", () => {
  let controller: CrudExampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrudExampleController],
      providers: [CrudExampleService],
    }).compile();

    controller = module.get<CrudExampleController>(CrudExampleController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
