import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskService } from './task/task.service';
import { TaskModule } from './task/task.module';

@Module({
  imports: [UserModule, TaskModule],
  providers: [TaskService],
})
export class AppModule {}
