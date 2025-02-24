import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { SupplyChainEvent } from './supply-chain-event.entity';

@Entity()
export class SupplyChainItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  color?: string;

  @Column('decimal', { nullable: true })
  price?: number;

  @OneToMany(() => SupplyChainEvent, (event) => event.item, { cascade: true })
  events: SupplyChainEvent[];
}
