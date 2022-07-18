import { Injectable } from '@nestjs/common';

@Injectable()
export class ExchangeService {
  async convertAmount({ from, to, amount }): Promise<void> {
    throw new Error();
  }
}
