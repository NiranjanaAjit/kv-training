import { Entity , Column, OneToMany} from "typeorm";
import AbstractEntity from "./abstract-entity";
import Employee from "./employee.entity";

@Entity()
export default class Department extends AbstractEntity{
    @Column()
    departmentName: string;

    @OneToMany(() => Employee, (employee) => employee.department)
    employees: Employee[];

}
