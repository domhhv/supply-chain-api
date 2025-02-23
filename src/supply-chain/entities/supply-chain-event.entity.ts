import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { SupplyChainItem } from './supply-chain-item.entity';

@Entity()
export class SupplyChainEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SupplyChainItem, (item) => item.events, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'item_id' })
  item: SupplyChainItem;

  @Column()
  location: string;

  @Column()
  custodian: string;

  @Column({ nullable: true })
  note?: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
}
