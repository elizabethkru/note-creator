import { Module } from '@nestjs/common';
import { NoteController } from './controllers/tasks.controller';
import { NoteModule } from 'src/modules/tasks/note.module';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from 'src/modules/users/user.module';
import { AuthController } from './controllers/users.controller';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  controllers: [NoteController, AuthController],
  imports: [CqrsModule, NoteModule, UserModule, AuthModule],
  providers: [],
})
export class ApiModule {}
