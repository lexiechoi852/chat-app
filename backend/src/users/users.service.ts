import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(dto: CreateUserDto): Promise<User> {
    const { name, email, profilePicture } = dto;
    // Check if user exists
    const user = await this.findOneByEmail(email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    // Hashed password
    const hashedPassword = await argon2.hash(dto.password);

    // Create user
    try {
      const newUser = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        profilePicture,
      });

      return newUser;
    } catch (err) {
      throw new HttpException('Failed to create user', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(userId: string): Promise<User[]> {
    const users = await this.userModel
      .find()
      .where('_id')
      .ne({ _id: userId })
      .exec();
    return users;
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async update(userId: string, dto: UpdateUserDto) {
    if (Object.keys(dto).length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Should update at least one property.',
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.findOneById(userId);

    if (!user) {
      throw new NotFoundException();
    }

    const { name, email, password, profilePicture } = dto;

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $set: { name, email, password, profilePicture } },
      { new: true },
    );
    return updatedUser;
  }

  async remove(userId: string) {
    const user = this.findOneById(userId);

    if (!user) {
      throw new NotFoundException();
    }

    const deletedUser = await this.userModel.findOneAndDelete({ _id: userId });
    return deletedUser;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }

  async findUserByNameOrEmail(userId, query): Promise<User[] | []> {
    // query name or email
    const users = await this.userModel
      .find()
      .or([
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ])
      .where('_id')
      .ne({ _id: userId })
      .exec();
    return users;
  }
}
