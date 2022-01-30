import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // rows = [
  //   { key: 1, name: 'Вася', weigth: 11.1, tail: 101.55 },
  //   { key: 2, name: 'Петя', weigth: 12.2, tail: 102.64 },
  //   { key: 3, name: 'Жора', weigth: 13.3, tail: 103.73 },
  //   { key: 4, name: 'Коля', weigth: 14.4, tail: 104.82 },
  //   { key: 5, name: 'Лёша', weigth: 15.5, tail: 105.91 },
  // ];
  items = [
    { id: 1, name: 'Яблоки', price: '$2' },
    { id: 2, name: 'Персики', price: '$5' },
  ];
  getHello() {
    // return 'Hello World!';
    // return [this.row, this.row, this.row];
    return { items: this.items };
  }
}
