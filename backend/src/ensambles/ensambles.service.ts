import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Ensemble } from "./schemas/ensamble.schema";
import { User } from "../users/schemas/user.schema";

@Injectable()
export class EnsemblesService {
  constructor(
    @InjectModel(Ensemble.name) private ensembleModel: Model<Ensemble>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async findAll(): Promise<Ensemble[]> {
    return await this.ensembleModel.find().exec();
  }

  async findById(ensembleId: string): Promise<Ensemble | null> {
    return this.ensembleModel.findById(ensembleId).exec();
  }

  async createEnsemble(createEnsembleDto: any, user: any): Promise<Ensemble> {
    const newEnsemble = new this.ensembleModel({
      ...createEnsembleDto,
      creator: user._id,
    });
    return newEnsemble.save();
  }

  async removeUserFromEnsembles(userId: string): Promise<void> {
    await this.ensembleModel.updateMany(
      { musicians: userId },
      { $pull: { musicians: userId } }
    );
  }

  async removeUserFromEnsemble(
    userId: string,
    ensembleId: string
  ): Promise<void> {
    // Step 1: Remove the user ID from the ensemble's musicians list
    const ensembleResult = await this.ensembleModel.updateOne(
      { _id: ensembleId, musicians: userId },
      { $pull: { musicians: userId } }
    );

    if (ensembleResult.matchedCount === 0) {
      throw new NotFoundException(
        `User with ID ${userId} is not part of ensemble ${ensembleId} or ensemble does not exist.`
      );
    }

    console.log(
      `User ${userId} removed from ensemble ${ensembleId}. Updated count: ${ensembleResult.modifiedCount}`
    );

    // Step 2: Remove the ensemble ID from the user's ensembles list
    const userResult = await this.userModel.updateOne(
      { _id: userId, ensembles: ensembleId },
      { $pull: { ensembles: ensembleId } }
    );

    if (userResult.matchedCount === 0) {
      console.warn(
        `Ensemble ID ${ensembleId} not found in user ${userId}'s ensembles list.`
      );
    }

    console.log(
      `Ensemble ${ensembleId} removed from user ${userId}'s ensembles list. Updated count: ${userResult.modifiedCount}`
    );
  }

  async joinEnsemble(userId: string, ensembleId: string) {
    // Step 1: Find the ensemble and add the user to the musicians list
    const ensemble = await this.ensembleModel.findByIdAndUpdate(
      ensembleId,
      { $addToSet: { musicians: userId } }, // Prevent duplicates
      { new: true } // Return updated document
    );
    if (!ensemble) {
      throw new NotFoundException("Ensemble not found");
    }

    // Step 2: Find the user and add the ensemble to their ensembles list
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { ensembles: ensembleId } },
      { new: true }
    );
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Step 3: Return the updated ensemble and user objects
    return { user, ensemble };
  }
}
