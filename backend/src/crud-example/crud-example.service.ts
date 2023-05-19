import { Injectable } from "@nestjs/common";
import { CreateCrudExampleDto } from "./dto/create-crud-example.dto";
import { UpdateCrudExampleDto } from "./dto/update-crud-example.dto";

@Injectable()
export class CrudExampleService {
  create(createCrudExampleDto: CreateCrudExampleDto) {
    return "This action adds a new crudExample";
  }

  findAll() {
    return `This action returns all crudExample`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crudExample`;
  }

  update(id: number, updateCrudExampleDto: UpdateCrudExampleDto) {
    return `This action updates a #${id} crudExample`;
  }

  remove(id: number) {
    return `This action removes a #${id} crudExample`;
  }
}
