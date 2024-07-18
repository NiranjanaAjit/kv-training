import {
  Entity,
  Column,
  OneToOne,
  ManyToOne,
  Unique
} from "typeorm";

import AbstractEntity from "./abstract-entity";
import Address from "./address.entity";
import { Role } from "../utils/role.enum";
import Department from "./department.entity";

@Entity()
export default class Employee extends AbstractEntity{

  @Column()
  name: string;

  @Column({unique: true})  
  email: string;

  @Column()
  age: number;

  @Column()
  experience: number;

  @Column()
  status: string;

  @OneToOne(() => Address, (address) => address.employee,{
    cascade: true,
    onDelete: "CASCADE"
  })
  address: Address;

  @Column({nullable: true})
  password: string;

  @Column({nullable: true})
  role: Role;

  @ManyToOne(() => Department, (department) => department.employees, {
    cascade: ["insert","update"]
  })
  department: Department;

}
