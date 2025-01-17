import { CreateEmployeeDto } from "../dto/employee.dto";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exceptions/http.exceptions";
import EmployeeRepository from "../repository/employee.repository";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { jwtPayload } from "../utils/jwtPayload.types";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import Department from "../entity/department.entity";
import DepartmentController from "../controller/department.controller";
import DepartmentService from "./department.service";
import DepartmentRepository from "../repository/department.repository";
import AppDataSource from "../db/data-source.db";
import exp from "constants";
class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository, private departmentRepository: DepartmentRepository) {}

  getAllEmployees = async (): Promise<Employee[]> => {
    // console.log(this.employeeRepository.find());
    return this.employeeRepository.find();
  };

  getEmployeeById = async (id: number): Promise<Employee | null> => {
    return this.employeeRepository.findOneBy({ id });
  };

  createEmployee = async (
    employeeDto: CreateEmployeeDto
  ): Promise<Employee> => {
    const newEmployee = new Employee();

    newEmployee.email = employeeDto.email;
    newEmployee.age = employeeDto.age;
    newEmployee.name = employeeDto.name;
    newEmployee.experience = employeeDto.experience;
    newEmployee.status = employeeDto.status;
    const newAddress = new Address();
    newAddress.line1 = employeeDto.address.line1;
    newAddress.pincode = employeeDto.address.pincode;
    newEmployee.address = newAddress;
    newEmployee.password = employeeDto.password
      ? await bcrypt.hash(employeeDto.password, 10)
      : "";
    newEmployee.role = employeeDto.role;
    const tempDept : string = employeeDto.department.departmentName;
    //instead of creating a new department, check if department already exists
    // const departmentService = new DepartmentService(
    //   new DepartmentRepository(AppDataSource.getRepository(Department))
    // );
    let department = await this.departmentRepository.findOneBy({
      departmentName:tempDept
      // employeeDto.department.departmentName
    }
    );
    console.log("dept", department);
    if (department) {
      newEmployee.department = department;
    } else {
      throw new HttpException(404,"department not found","check department or add new department")
    }

    // console.log(newEmployee);
    const response = await this.employeeRepository.save(newEmployee);
    console.log(response);
    return response;
  };

  updateEmployee = async (
    id: number,
    email: string,
    name: string,
    age: number,
    address: any,
    department: any,
    status: string,
    experience: number
  ): Promise<Employee> => {
    let employee = await this.employeeRepository.findOneBy({ id });
    if (employee == null) {
      return null;
    }
    employee.name = name;
    employee.email = email;
    employee.status = status;
    employee.experience = experience;
    employee.age = age;
    employee.address.line1 = address.line1;
    employee.address.pincode = address.pincode;
    
    employee.department.departmentName = department.departmentName;
    return this.employeeRepository.save(employee);
  };

  deleteEmployee = async (id: number): Promise<void> => {
    let employee = await this.employeeRepository.findOneBy({ id });

    await this.employeeRepository.remove(employee);
  };

  loginEmployee = async (email: string, password: string) => {
    let employee = await this.employeeRepository.findOneBy({ email });
    if (!employee) {
      throw new HttpException(404, "user not found", "login failed");
    }

    const result = await bcrypt.compare(password, employee.password);
    if (!result) {
      throw new HttpException(400, "wrong password", "reenter password");
    }
    const payload: jwtPayload = {
      name: employee.name,
      email: employee.email,
      role: employee.role,
    };

    const token = jsonwebtoken.sign(payload, JWT_SECRET, {
      expiresIn: JWT_VALIDITY,
    });
    return { token };
  };
}

export default EmployeeService;
