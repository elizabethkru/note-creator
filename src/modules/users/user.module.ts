import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';

import { UsersSchema } from './infrastructure/schemas/user.schema';
import { UserRepository } from './infrastructure/repository/user.repository';
import { UsercommandHandlers } from './application/command';

@Module({
  imports: [TypeOrmModule.forFeature([UsersSchema]), CqrsModule, HttpModule],
  exports: ['IUserRepository'],
  providers: [
    ...UsercommandHandlers,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
