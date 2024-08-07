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

    return insertResult;
  }

  getRandomNumber(digit: number) {
    return Math.random().toFixed(digit).split('.')[1];
  }

  async findOne(phone: string) {
    return await this.userRepository.findOne({ where: { phone: phone } });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update({ id: id }, updateUserDto);
  }
}
