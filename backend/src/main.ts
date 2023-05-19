import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import session from "express-session";
import { COOKIE_SECRET } from "./constants";
import { NestExpressApplication } from "@nestjs/platform-express";
import passport from "passport";
import cookieParser from "cookie-parser";
import { PrismaService } from "./prisma/prisma.service";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix("api");

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.set("trust proxy", 1);

  app.use(
    session({
      secret: COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
      },
    }),
  );

  app.use(cookieParser());

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(9000);
}

bootstrap().then(() => console.log("Server started on port 9000"));
