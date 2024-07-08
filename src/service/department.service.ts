import e from "express";
import { DepartmentDto } from "../dto/department.dto";
import Department from "../entity/department.entity";
import DepartmentRespository from "../repository/department.repository";
import HttpException from "../exceptions/http.exceptions";

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

    updateDepartment = async (
      id: number, deptname: string
    ): Promise<Department> => {
      //get employee repo
      let department = await this.departmentRepository.findOneBy({ id });
      if (department == null) {
        throw new HttpException(404,"no department of this id","reenter id");
      }
      else{
        department.departmentName = deptname;

        return await this.departmentRepository.save(department);
      }

    };

  deleteDepartment = async (id: number): Promise<void> => {
    let department = await this.departmentRepository.findOneBy({ id });
    if(department.employees.length == 0){
      await this.departmentRepository.remove(department);
    }
    else{
      throw new HttpException(404,"DEPARTMENT HAS EMPLOYEES","empty department first");
    }

  };

  getDepartmentByName(departmentName: string) {
    return this.departmentRepository.findOneBy({ departmentName });
    
  }



}
