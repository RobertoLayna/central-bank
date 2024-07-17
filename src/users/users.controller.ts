import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/constants';
import { info, log } from 'console';
import { User } from './entities/user.entity';
import { UpdateResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    let result: CreateUserDto;
    try {
      result = await this.usersService.create(createUserDto);
    } catch (err) {
      console.log(err);
      return { status: 'Fail', message: err.sqlMessage, errors: [] };
    }
    info(`Usuario ${createUserDto.email} fue creado!`);
    return { status: 'Success', data: result };
  }

  @Get()
  async findOne(@Request() req) {
    let result: User;
    try {
      result = await this.usersService.findOneById(req.user.id);
    } catch (err) {
      return { status: 'Fail', message: 'Error al consultar usuario' };
    }
    return { status: 'Success', data: result };
  }

  @Patch()
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    let result: any;
    try {
      result = await this.usersService.update(req.user.id, updateUserDto);
    } catch (err) {
      return { status: 'Fail', message: 'Error al actualizar usuario' };
    }

    info(result);
    return {
      status: 'Success',
      message:
        (result as UpdateResult).affected > 0
          ? 'Usuario actualizado'
          : 'No se actualizo ningun dato',
    };
  }
}
