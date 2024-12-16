import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(name: string): Promise<User | null> {
    return this.userModel.findOne({ name: name }).exec();
  }

  async updateProfile(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true, upsert: false })
      .exec();
  }
  async deleteUser(userId: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await this.userModel.findByIdAndDelete(userId);
  }
}
