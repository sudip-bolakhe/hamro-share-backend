import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async addUser(createUser: CreateUserDto) {
    const userToSave = new this.userModel(createUser);
    return userToSave.save();
  }

  async findById(id: string) {
    return await this.userModel.findOne({ _id: id }).exec();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async deleteUserById(id: string) {
    await this.userModel.findOneAndRemove({ _id: id }).exec();
  }

  async updateUser(id: string, userUpdateDto: UpdateUserDto) {
    return await this.userModel
      .findOneAndUpdate({ _id: id }, userUpdateDto)
      .exec();
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async findByAddress(address: string) {
    return await this.userModel.find({ address }).exec();
  }
}
