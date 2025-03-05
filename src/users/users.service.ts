import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>
    ) {

  }

  async create(createUserDto: CreateUserDto) {
    const createdCat = await this.userModel.create(createUserDto);
    return createdCat;
  }

  async findAll() {
    return this.userModel.find().exec();
  }


  async findOne(username: string): Promise<User | null> {
    return this.userModel.findOne({username});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
