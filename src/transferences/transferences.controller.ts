import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { TransferencesService } from './transferences.service';
import { CreateTransferenceDto } from './dto/create-transference.dto';

@Controller('transferences')
export class TransferencesController {
  constructor(private readonly transferencesService: TransferencesService) { }

  @Post()
  async create(@Request() req, @Body() createTransferenceDto: CreateTransferenceDto) {
    return {
      status: 'Success', message: await this.transferencesService.create(req.user.id, createTransferenceDto), data: { amount: createTransferenceDto.amount }
    };
  }

  @Get()
  async findAll(@Request() req) {
    return {
      status: 'Success', data: await this.transferencesService.findAll(req.user.id)
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      status: 'Success', data: await this.transferencesService.findOne(+id)
    };
  }
}
