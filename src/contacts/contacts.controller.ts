import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from './contact.entity';
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'size', required: false })
  @ApiQuery({ name: 'order', required: false })
  @ApiQuery({ name: 'dir', required: false })
  index(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('order') order: string,
    @Query('dir') dir: string,
  ): Promise<Contact[]> {
    return this.contactsService.findAll(page, size, order, dir);
  }

  @Get(':order/page:page')
  @ApiQuery({ name: 'dir', required: false })
  @ApiQuery({ name: 'size', required: false })
  @ApiParam({ name: 'page' })
  @ApiParam({ name: 'order' })
  pageOrder(
    @Query('dir') direction: string,
    @Query('size') size: number,
    @Param('page') page,
    @Param('order') order,
  ): Promise<Contact[]> {
    return this.contactsService.getPageOrder(page, order, direction, size);
  }

  @Get('page:page')
  @ApiParam({ name: 'page' })
  page(@Param('page') page): Promise<Contact[]> {
    return this.contactsService.getPage(page);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() contactData: Contact): Promise<any> {
    if (contactData != null) contactData.id = null;
    else contactData = new Contact();
    return this.contactsService.create(contactData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiParam({ name: 'id' })
  async update(@Param('id') id, @Body() contactData: Contact): Promise<any> {
    // console.log(id);
    contactData.id = Number(id);
    console.log('Update #' + contactData.id);
    return this.contactsService.update(id, contactData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiParam({ name: 'id' })
  async delete(@Param('id') id): Promise<any> {
    return this.contactsService.delete(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiParam({ name: 'id' })
  async getOne(@Param('id') id): Promise<any> {
    return this.contactsService.get(id);
  }
}
