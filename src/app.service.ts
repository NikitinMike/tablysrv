import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'NESTJS SERVER APP \n Hello World!';
  }
}
