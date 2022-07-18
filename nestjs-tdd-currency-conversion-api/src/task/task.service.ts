import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  async createTask({}: any): Promise<void> {
    throw new Error();
  }
}
