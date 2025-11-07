import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

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
  findAll(@Query('role') role?: ROLE | undefined): IUser[] {
    return this.userService.findAll(role)
  }

  @Get(':id') //Get user //:id
  findOne(@Param('id') id: string): IUser | null {
    return this.userService.findOne(Number(id)) ?? null;
  }

  @Post()
  create(@Body() user: {}) {
    return user;
  }

  @Patch(':id') //PATCH user //:id
  update(@Param('id') id: string, @Body() userUpdate: {}) {
    return { id, ...userUpdate };
  }

  @Delete(':id') //Get user //:id
  delete(@Param('id') id: string): IUser | null {
    return this.userService.delete(+id) ?? null;

  }
}
