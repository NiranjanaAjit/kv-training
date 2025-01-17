import { Repository } from "typeorm";
import dataSource from "../db/data-source.db";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
  

  constructor(private repository: Repository<Employee>) {
    this.repository = repository;
  }

  find = async (): Promise<Employee[]> => {
    console.log()
    return this.repository.find({relations: ["address","department"]});

  }

  findOneBy = async (filter: Partial<Employee>): Promise<Employee | null> => {
    return this.repository.findOne({ where: filter ,
      relations: ["address","department"],
    });
  }

  save = async (employee: Employee): Promise<Employee> =>{
    return this.repository.save(employee);
  }

  async update(filter: number, employee: Employee): Promise<Employee> {
    let oldEmployee = await this.repository.findOneBy({ id: filter });
    oldEmployee = employee;
    return this.repository.save(oldEmployee);
  }

  remove = async (employee: Employee): Promise<void> => {
    await this.repository.softRemove(employee);
  }

  delete = async (id: number) : Promise<void> => {
    await this.repository.softDelete(id)
  }


}

export default EmployeeRepository;
