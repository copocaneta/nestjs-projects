import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ExchangeService {
  async convertAmount({ from, to, amount }): Promise<void> {
    if (!from || !to || !amount) {
      throw new BadRequestException();
    }
  }
}
