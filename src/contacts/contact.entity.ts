import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Contact extends BaseEntity {
  @ApiProperty({})
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({})
  @Column({ nullable: true })
  firstName: string;

  @ApiProperty({})
  @Column({ nullable: true })
  lastName: string;

  @ApiProperty({})
  @Column({ nullable: true })
  email: string;

  @ApiProperty({})
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({})
  @Column({ nullable: true })
  city: string;

  @ApiProperty({})
  @Column({ nullable: true })
  country: string;
}
