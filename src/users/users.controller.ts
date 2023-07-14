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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

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
    info(`Usuario ${createUserDto.email} fue creado!`)
    return { status: 'Success', data: result };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'No'; //this.usersService.findOne(+id);
  }

  @Patch()
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }
}
