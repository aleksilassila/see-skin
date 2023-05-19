import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ProductsModule } from "./products/products.module";
import { IngredientsModule } from "./ingredients/ingredients.module";
import { AdminModule } from "./admin/admin.module";
import { UsersModule } from "./users/users.module";
import { SkinProfileModule } from "./skin-profile/skin-profile.module";
import { CrudExampleModule } from "./crud-example/crud-example.module";

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    IngredientsModule,
    AdminModule,
    UsersModule,
    SkinProfileModule,
    CrudExampleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
