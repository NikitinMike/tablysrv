import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from './contact.entity';
import { ApiParam } from '@nestjs/swagger';

@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Get()
  index(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }

  @Post()
  async create(@Body() contactData: Contact): Promise<any> {
    if (contactData != null) contactData.id = null;
    else contactData = new Contact();
    return this.contactsService.create(contactData);
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  async update(@Param('id') id, @Body() contactData: Contact): Promise<any> {
    // console.log(id);
    contactData.id = Number(id);
    console.log('Update #' + contactData.id);
    return this.contactsService.update(id, contactData);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  async delete(@Param('id') id): Promise<any> {
    return this.contactsService.delete(id);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  async getOne(@Param('id') id): Promise<any> {
    return this.contactsService.get(id);
  }
}
