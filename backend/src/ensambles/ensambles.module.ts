import { forwardRef, Module } from "@nestjs/common";
import { EnsemblesController } from "./ensambles.controller";
import { EnsemblesService } from "./ensambles.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Ensemble, EnsembleSchema } from "./schemas/ensamble.schema";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ensemble.name, schema: EnsembleSchema },
    ]),
    forwardRef(() => UsersModule), // Use forwardRef to avoid circular dependency
  ],
  controllers: [EnsemblesController],
  providers: [EnsemblesService],
  exports: [EnsemblesService],
})
export class EnsemblesModule {}
