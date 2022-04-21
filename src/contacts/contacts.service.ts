import { Injectable } from '@nestjs/common';
import {
  DeleteResult,
  FindManyOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  pageSize = 10;
  dir = true;

  getOrder(orderBy: string) {
    const findOptions: FindManyOptions<Contact> = {};
    // console.log(this.dir);
    return orderBy
      ? (findOptions.order = { [orderBy]: this.dir ? 1 : -1 })
      : (findOptions.order = { id: this.dir ? 1 : -1 });
  }

  // const findOptions: FindManyOptions<Contact> = { where: findWhere, };

  async getPageOrder(page: number, orderBy: string, direction, size: number) {
    if (size) this.pageSize = size;
    if (direction) this.dir = direction == '1';
    // console.log(this.dir, direction);
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

  async findAll(
    page: number,
    size: number,
    order: string,
    dir: string,
  ): Promise<Contact[]> {
    // console.log(page, size, order, dir);
    if (!page) page = 0;
    if (size) this.pageSize = size;
    if (dir) this.dir = dir == '1';
    return await this.contactRepository.find({
      skip: this.pageSize * page,
      take: this.pageSize,
      order: this.getOrder(order),
    });
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
