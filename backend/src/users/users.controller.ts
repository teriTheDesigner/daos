import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Request,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./schemas/user.schema";
import { UpdateUserDto } from "./dto/update-user.dto";
import { EnsemblesService } from "../ensambles/ensambles.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private ensemblesService: EnsemblesService
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Patch(":id")
  async updateProfile(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.updateProfile(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(
    @Param("id") userId: string,
    @Request() req: Request // Access the request object here
  ): Promise<void> {
    // Step 1: Remove the user from all ensembles
    await this.ensemblesService.removeUserFromEnsembles(userId);

    // Step 2: Delete the user from the database
    await this.usersService.deleteUser(userId);
  }
}
