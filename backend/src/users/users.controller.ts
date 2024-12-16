import { Body, Controller, Post, Get, Param, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./schemas/user.schema";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Put(":id")
  async updateProfile(
    @Param("id") id: string,
    @Body() updateUserDto: CreateUserDto
  ): Promise<User> {
    return this.usersService.updateProfile(id, updateUserDto);
  }
}
