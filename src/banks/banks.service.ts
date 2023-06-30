import { Injectable } from '@nestjs/common';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from './entities/bank.entity';

@Injectable()
export class BanksService {
  constructor(
    @InjectRepository(Bank)
    private bankRepository: Repository<Bank>,
  ) { }
  async create(createBankDto: CreateBankDto) {
    const newBank: Bank = {
      //id: 0,
      name: createBankDto.name,
      description: createBankDto.description,
      //status: 0
    }
    const insertResult = await this.bankRepository.insert(newBank);
    createBankDto.id = insertResult.generatedMaps[0].id
    createBankDto.status = insertResult.generatedMaps[0].status
    return createBankDto
  }

  findAll() {
    return this.bankRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} bank`;
  }

  update(id: number, updateBankDto: UpdateBankDto) {
    return `This action updates a #${id} bank`;
  }

  remove(id: number) {
    return `This action removes a #${id} bank`;
  }
}
