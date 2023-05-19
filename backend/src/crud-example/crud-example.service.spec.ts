import { Test, TestingModule } from "@nestjs/testing";
import { CrudExampleService } from "./crud-example.service";

describe("CrudExampleService", () => {
  let service: CrudExampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrudExampleService],
    }).compile();

    service = module.get<CrudExampleService>(CrudExampleService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
