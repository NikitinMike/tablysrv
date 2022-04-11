import { Injectable } from '@nestjs/common';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  pageSize = 10;

  async getPage(page: number): Promise<Contact[]> {
    return await this.contactRepository.find({
      skip: this.pageSize * page,
      take: this.pageSize,
      order: { id: 'ASC' },
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
