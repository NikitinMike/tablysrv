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

  rows = [
    ['', 'jsdidhx', 'ghdhdhd', 'jfjfdjdfdsl', 356778, 'jdiow euhu wsuh', 'hdjfjikshf',],
    ['', 'uijflsdjh', 'ffffvc', 'ehjjkjf', 6899, 'fiky ukioogy gh', 'gustukhhg',],
    ['', 'idjskf', 'vbccfff', 'dhjgfd', 57890, 'fhjjffg gjhh', 'fhiuturdgu'],
    ['', 'ldfjddik', 'cgggh', 'dhjkssdffg', 35789, 'uuesfibuy ufff', 'gikofgh'],
  ];

  getHello() {
    // return { items: this.items };
    return { rows: this.rows };
  }
}
