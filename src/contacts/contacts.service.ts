import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async findAll(): Promise<Contact[]> {
    return await this.contactRepository.find();
  }

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
