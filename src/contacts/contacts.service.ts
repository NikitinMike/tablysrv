import { Injectable } from '@nestjs/common';
import {
  DeleteResult,
  FindManyOptions,
  Like,
  Repository,
  UpdateResult,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './contact.entity';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  pageSize = 10;

  getOrder(orderBy: string) {
    const findOptions: FindManyOptions<Contact> = {};
    switch (orderBy) {
      case 'firstName':
        return (findOptions.order = { firstName: 'ASC' });
      case 'lastName':
        return (findOptions.order = { lastName: 'ASC' });
      case 'email':
        return (findOptions.order = { email: 'ASC' });
      case 'phone':
        return (findOptions.order = { phone: 'ASC' });
      case 'city':
        return (findOptions.order = { city: 'ASC' });
      case 'country':
        return (findOptions.order = { country: 'ASC' });
      default:
        return (findOptions.order = { id: 'ASC' });
    }
  }

  /*
  const findOptions: FindManyOptions<Contact> = {
    // skip: filter.offset,
    // take: filter.limit,
    order: { orderBy: 1 },
    // where: findWhere,
  };
  */

  // const order = {};
  // Object.defineProperty(order, orderBy, 1);
  // console.log(order);

  async getPageOrder(page: number, orderBy: string) {
    console.log(orderBy);
    return await this.contactRepository.find({
      skip: this.pageSize * page,
      take: this.pageSize,
      order: this.getOrder(orderBy),
    });
  }

  async getPage(page: number): Promise<Contact[]> {
    return await this.contactRepository.find({
      skip: this.pageSize * page,
      take: this.pageSize,
      order: { id: 1 },
    });
  }

  async findAll(): Promise<Contact[]> {
    return await this.contactRepository.find();
  }

  /*
  async findAll(query): Promise<Paginate> {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const keyword = query.keyword || '';

    const [result, total] = await this.contactRepository.findAndCount({
      where: { name: Like('%' + keyword + '%') },
      order: { name: 'DESC' },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }
  */

  async create(contact: Contact): Promise<Contact> {
    return await this.contactRepository.save(contact);
  }

  async update(id, contact: Contact): Promise<UpdateResult> {
    // console.log(contact);
    return await this.contactRepository.update(id, contact);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.contactRepository.delete(id);
  }

  async get(id): Promise<Contact> {
    return await this.contactRepository.findOneOrFail(id);
  }
}
