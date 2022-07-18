import { Injectable } from '@nestjs/common';

@Injectable()
export class ExchangeService {
  async convertAmount(params: any): Promise<void> {
    throw new Error();
  }
}
