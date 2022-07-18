import { Module } from '@nestjs/common';
import { TaskService } from './task/task.service';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TaskModule],
  providers: [TaskService],
})
export class AppModule {}
