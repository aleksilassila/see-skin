import { Module } from "@nestjs/common";
import { CrudExampleService } from "./crud-example.service";
import { CrudExampleController } from "./crud-example.controller";

@Module({
  controllers: [CrudExampleController],
  providers: [CrudExampleService],
})
export class CrudExampleModule {}
