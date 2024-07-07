import e from "express";
import { DepartmentDto } from "../dto/department.dto";
import Department from "../entity/department.entity";
import DepartmentRespository from "../repository/department.repository";

export default class DepartmentService {
  constructor(private departmentRepository: DepartmentRespository) {}
  getAllDepartments = async (): Promise<Department[]> => {
    return this.departmentRepository.find();
  };

  getDepartmentById = async (id: number): Promise<Department | null> => {
    return this.departmentRepository.findOneBy({ id });
  };

  createDepartment = async (
    departmentDto: DepartmentDto
  ): Promise<Department> => {
    const newdepartment = new Department();

    newdepartment.departmentName = departmentDto.departmentName;
    return this.departmentRepository.save(newdepartment);
  };

  //   updateDepartment = async (
  //     id: number,
  //     employeeId : number[]
  //   ): Promise<Department> => {
  //     //get employee repo
  //     let department = await this.departmentRepository.findOneBy({ id });
  //     if (department == null) {
  //       return null;
  //     }
  //     for(num: number in employeeId){
  //         let employee = await this.employeeRepository.findOneBy({ id });
  //     }
  //     department.employees += employeeId;

  //     return this.departmentRepository.save(department);
  //   };

  deleteDepartment = async (id: number): Promise<void> => {
    let department = await this.departmentRepository.findOneBy({ id });
    await this.departmentRepository.remove(department);
  };
}
