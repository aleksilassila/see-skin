import { PartialType } from '@nestjs/mapped-types';
import { CreateCrudExampleDto } from './create-crud-example.dto';

export class UpdateCrudExampleDto extends PartialType(CreateCrudExampleDto) {}
