import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ensemble } from './schemas/ensamble.schema';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class EnsemblesService {
  constructor(
    @InjectModel(Ensemble.name) private ensembleModel: Model<Ensemble>,
    @InjectModel(User.name) private userModel: Model<User>,
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

  async joinEnsemble(userId: string, ensembleId: string) {
    // Step 1: Find the ensemble and add the user to the musicians list
    const ensemble = await this.ensembleModel.findByIdAndUpdate(
      ensembleId,
      { $addToSet: { musicians: userId } }, // Prevent duplicates
      { new: true }, // Return updated document
    );
    if (!ensemble) {
      throw new NotFoundException('Ensemble not found');
    }

    // Step 2: Find the user and add the ensemble to their ensembles list
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { ensembles: ensembleId } },
      { new: true },
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Step 3: Return the updated ensemble and user objects
    return { user, ensemble };
  }
}
