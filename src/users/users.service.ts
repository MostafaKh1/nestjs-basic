import { Injectable } from '@nestjs/common';

type ROLE = 'INTERN' | 'ADMIN' | 'MANAGER';

interface IUser {
  id: number;
  name: string;
  email: string;
  role: ROLE;
}

type CreateUser = Omit<IUser, 'id'>;
type UpdateUser = Partial<Omit<IUser, 'id'>>;

@Injectable()
export class UsersService {
  private users: IUser[] = [
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
      return this.users.filter((user) => user.role === role);
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  create(user: CreateUser): IUser {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const nextId = usersByHighestId[0].id + 1

    const newUser: IUser = {
      id: nextId,
      ...user,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, updatedUser: UpdateUser) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
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
