import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NoteModule } from './modules/tasks/note.module';
import { CreateNoteHandler } from './modules/tasks/application/command/create-note.command';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(app.select(NoteModule).get(CreateNoteHandler));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
