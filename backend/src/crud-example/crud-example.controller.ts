import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CrudExampleService } from "./crud-example.service";
import { CreateCrudExampleDto } from "./dto/create-crud-example.dto";
import { UpdateCrudExampleDto } from "./dto/update-crud-example.dto";

@Controller("crud-example")
export class CrudExampleController {
  constructor(private readonly crudExampleService: CrudExampleService) {}

  @Post()
  create(@Body() createCrudExampleDto: CreateCrudExampleDto) {
    return this.crudExampleService.create(createCrudExampleDto);
  }

  @Get()
  findAll() {
    return this.crudExampleService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.crudExampleService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCrudExampleDto: UpdateCrudExampleDto,
  ) {
    return this.crudExampleService.update(+id, updateCrudExampleDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.crudExampleService.remove(+id);
  }
}
