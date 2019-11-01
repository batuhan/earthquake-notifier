import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export default class Earthquake extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  date!: Date;

  @Column()
  location!: string;

  @Column("float")
  latitude!: number;

  @Column("float")
  longitude!: number;

  @Column("float")
  magnitude!: number;

  @Column("float")
  depth!: number;
}
