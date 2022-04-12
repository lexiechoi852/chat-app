import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(dto: CreateUserDto): Promise<User> {
    const { name, email } = dto;
    // Check if user exists
    const user = await this.findOneByEmail(dto.email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    // Hashe password
    const hashedPassowrd = await argon2.hash(dto.password);

    // Create user
    const newUser = await this.userModel.create({
      name,
      email,
      password: hashedPassowrd,
    });
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.findOne(id);

    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    this.findOne(id);

    return `This action removes a #${id} user`;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }
}
