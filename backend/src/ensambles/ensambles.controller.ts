import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Param,
  Delete,
} from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { EnsemblesService } from "./ensambles.service";
import { Ensemble } from "./schemas/ensamble.schema";

@Controller("ensembles")
export class EnsemblesController {
  constructor(private ensemblesService: EnsemblesService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createEnsemble(@Body() createEnsembleDto: any, @Request() req: any) {
    const user = req.user;
    return this.ensemblesService.createEnsemble(createEnsembleDto, user);
  }

  @Get()
  async findAll(): Promise<Ensemble[]> {
    return this.ensemblesService.findAll();
  }

  @Post(":id/join")
  async joinEnsemble(
    @Param("id") ensembleId: string,
    @Body("userId") userId: string
  ) {
    return this.ensemblesService.joinEnsemble(userId, ensembleId);
  }

  @Get(":id")
  async findOne(@Param("id") ensembleId: string): Promise<Ensemble> {
    return this.ensemblesService.findById(ensembleId);
  }

  @UseGuards(AuthGuard)
  @Delete(":userId/leave/:ensembleId")
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeUserFromEnsemble(
    @Param("userId") userId: string,
    @Param("ensembleId") ensembleId: string
  ): Promise<void> {
    console.log(
      `Request to remove user ${userId} from ensemble ${ensembleId} received.`
    );

    await this.ensemblesService.removeUserFromEnsemble(userId, ensembleId);

    console.log(
      `User ${userId} successfully removed from ensemble ${ensembleId}.`
    );
  }
}
