import { AppModule } from "./app.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost/test-daos"), AppModule],
  controllers: [AppController],
  providers: [AppService],
})
export class TestModule {}
