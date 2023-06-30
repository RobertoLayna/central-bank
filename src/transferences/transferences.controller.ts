import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransferencesService } from './transferences.service';
import { CreateTransferenceDto } from './dto/create-transference.dto';
import { UpdateTransferenceDto } from './dto/update-transference.dto';

@Controller('transferences')
export class TransferencesController {
  constructor(private readonly transferencesService: TransferencesService) {}

  @Post()
  create(@Body() createTransferenceDto: CreateTransferenceDto) {
    return this.transferencesService.create(createTransferenceDto);
  }

  @Get()
  findAll() {
    return this.transferencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transferencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransferenceDto: UpdateTransferenceDto) {
    return this.transferencesService.update(+id, updateTransferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transferencesService.remove(+id);
  }
}
