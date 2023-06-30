import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) { }

  create(account: Account) {
    return this.accountRepository.save(account);
  }

  findAll() {
    return `This action returns all accounts`;
  }

  async findOne(id: number) {
    return await this.accountRepository.findOne({
      where: { id_user: id }, relations: {
        card: true,
        user: true
      }
    })
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
