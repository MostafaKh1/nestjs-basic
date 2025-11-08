import { Injectable, NotFoundException } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';


type ROLE = 'INTERN' | 'ADMIN' | 'MANAGER';


@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Avery Brooks',
      email: 'avery.brooks@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Casey Lane',
      email: 'casey.lane@example.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Elliott Shaw',
      email: 'elliott.shaw@example.com',
      role: 'MANAGER',
    },
    {
      id: 4,
      name: 'Jordan Price',
      email: 'jordan.price@example.com',
      role: 'INTERN',
    },
    {
      id: 5,
      name: 'Morgan Kim',
      email: 'morgan.kim@example.com',
      role: 'ADMIN',
    },
  ];

  findAll(role?: ROLE) {
    if (role) {
      const rolesUsers = this.users.filter((user) => user.role === role);
      if (!rolesUsers.length) throw new NotFoundException('User role not found')
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found')
    return user;
  }

  create(createUserDto: createUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const nextId = usersByHighestId[0].id + 1

    const newUser = {
      id: nextId,
      ...createUserDto,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, updateUserDto: updateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }

      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removeUser = this.findOne(id)

    this.users = this.users.filter(user => user.id !== id)

    return removeUser
  }
}
