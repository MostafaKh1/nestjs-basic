import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

interface IUser {
  id: number;
  name: string;
  email: string;
  role: ROLE;
}

type ROLE = 'INTERN' | 'ADMIN' | 'MANAGER';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }
  @Get()
  findAll(@Query('role') role?: ROLE | undefined) {
    return this.userService.findAll(role)
  }

  @Get(':id') //Get user //:id
  findOne(@Param('id', ParseIntPipe) id: number,) {
    return this.userService.findOne(id) ?? null;
  }

  @Post()
  create(@Body(ValidationPipe) createUserDto: createUserDto): createUserDto {
    return this.userService.create(createUserDto)
  }

  @Patch(':id') //PATCH user //:id
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: updateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id') //Get user //:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id) ?? null;

  }
}
