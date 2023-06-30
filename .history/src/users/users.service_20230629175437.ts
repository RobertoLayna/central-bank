import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(AccountsService)
    private readonly accountService: AccountsService,
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

    const insertResult = await this.userRepository.save(newUser);

    const createAccounts = await this.accountService.create({
      id_user: insertResult.id,
      balance: 10000,
      status: 0,
      card: [
        {
          status: 0,
          card: this.getRandomNumber(16),
          card_account: this.getRandomNumber(18),
        },
      ],
    });

    createUserDto.id = insertResult.generatedMaps[0].id;
    return createUserDto;
  }

  getRandomNumber(digit) {
    return Math.random().toFixed(digit).split('.')[1];
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
