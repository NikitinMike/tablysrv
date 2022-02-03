import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Contact {
  @ApiProperty({})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({})
  @Column()
  firstName: string;

  @ApiProperty({})
  @Column()
  lastName: string;

  @ApiProperty({})
  @Column()
  email: string;

  @ApiProperty({})
  @Column()
  phone: string;

  @ApiProperty({})
  @Column()
  city: string;

  @ApiProperty({})
  @Column()
  country: string;
}
