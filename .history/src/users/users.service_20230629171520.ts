import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser: User = {
      name: createUserDto.name,
      lastname: createUserDto.lastname,
      email: createUserDto.email,
      rfc: createUserDto.rfc,
      phone: createUserDto.phone,
      password: createUserDto.password,
      id_bank: createUserDto.id_bank,
    };

    const insertResult = await this.userRepository.insert(newUser);
    createUserDto.id = insertResult.generatedMaps[0].id;
    return createUserDto;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(phone: string) {
    return await this.userRepository.findOne({ where: { phone: phone } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
