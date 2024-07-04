import { PrimaryGeneratedColumn , CreateDateColumn, DeleteDateColumn, UpdateDateColumn} from "typeorm";

export default class AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;

}