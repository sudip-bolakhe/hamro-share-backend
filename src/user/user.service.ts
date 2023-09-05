import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const password = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = password;
    return await this.userRepo.addUser(createUserDto);
  }

  async findAll() {
    return await this.userRepo.findAll();
  }

  async findOne(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id [${id}] not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    await this.userRepo.updateUser(id, updateUserDto);
    return await this.userRepo.findById(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.userRepo.deleteUserById(id);
    return `User with id  #${id} removed`;
  }

  async findByEmail(email: string) {
    return await this.userRepo.findByEmail(email);
  }
}
