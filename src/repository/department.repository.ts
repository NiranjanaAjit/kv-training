import { Repository } from "typeorm";
import Department from "../entity/department.entity";

export default class DepartmentRepository {
  constructor(private repository: Repository<Department>) {
    this.repository = repository;
  }

  find = async (): Promise<Department[]> => {
    return this.repository.find({ relations: ["employees"] });
  };

  findOneBy = async (
    filter: Partial<Department>
  ): Promise<Department | null> => {
    return this.repository.findOne({ where: filter, relations: ["employees"] });
  };

  save = async (department: Department): Promise<Department> =>{
    return this.repository.save(department);
  };

  remove = async (department: Department): Promise<void> => {
    await this.repository.softRemove(department);
  }
}
