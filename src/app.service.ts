import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  row = [
    '1',
    'jsdidhx',
    'ghdhdhd',
    'jfjfdjdfdsl',
    356778,
    'jdiow euhu wsuh',
    'hdjfjikshf',
  ];
  getHello(): any {
    // return 'NESTJS SERVER APP <br/> Hello World!';
    return [this.row, this.row, this.row];
  }
}
