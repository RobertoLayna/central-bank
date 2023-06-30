import { Injectable } from '@nestjs/common';
import { CreateTransferenceDto } from './dto/create-transference.dto';
import { UpdateTransferenceDto } from './dto/update-transference.dto';

@Injectable()
export class TransferencesService {
  create(createTransferenceDto: CreateTransferenceDto) {
    return 'This action adds a new transference';
  }

  findAll() {
    return `This action returns all transferences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transference`;
  }

  update(id: number, updateTransferenceDto: UpdateTransferenceDto) {
    return `This action updates a #${id} transference`;
  }

  remove(id: number) {
    return `This action removes a #${id} transference`;
  }
}
