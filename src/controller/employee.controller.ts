import { Router, Request, Response } from "express";
import EmployeeService from "../service/employee.service";
import Employee from "../entity/employee.entity";
import Address from "../entity/address.entity";
import { NextFunction } from "express";
import HttpException from "../exceptions/http.exceptions";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/employee.dto";
import { validate } from "class-validator";
import authorize from "../middleware/authorize.middleware";
import { RequestWithUser } from "../utils/jwtPayload.types";
import { Role } from "../utils/role.enum";

//createEmployee errors setup

class EmployeeController {
  public router: Router;

  constructor(private employeeService: EmployeeService) {
    this.router = Router();
    this.router.get("/", this.getAllEmployees);
    this.router.get("/:employeeId", this.getEmployeeById);
    this.router.post("/", authorize, this.createEmployee);
    this.router.put("/:employeeId", authorize, this.updateEmployee);
    this.router.delete("/:employeeId", authorize, this.deleteEmployee);
    this.router.post("/login", this.loginEmployee);
  }

  public getAllEmployees = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const employees = await this.employeeService.getAllEmployees();
      if (employees.length == 0) {
        const error = new HttpException(
          404,
          "missing employee",
          "no employee records!"
        );
        throw error;
      }
      response.status(200).send(employees);
    } catch (err) {
      next(err);
    }
  };

  public getEmployeeById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const employee = await this.employeeService.getEmployeeById(
        Number(request.params.employeeId)
      );
      if (!employee) {
        const error = new HttpException(
          404,
          "missing employee",
          `no employee of ${request.params.employeeId} id!`
        );
        throw error;
      }
      response.status(200).send(employee);
    } catch (err) {
      next(err);
    }
  };

  public createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const role = request.role;
      if (role != Role.HR) {
        throw new HttpException(403, "YOU DO NOT HAVE ACCES", "NO ACCESS");
      }
      const employeeDto = plainToInstance(CreateEmployeeDto, request.body);
      const errors = await validate(employeeDto);
      console.log(typeof errors, errors);
      if (errors.length != 0) {
        const error = new HttpException(
          404,
          "Validation Failed",
          JSON.stringify(errors)
        );
        throw error;
      } else {
        const employee = await this.employeeService.createEmployee(employeeDto);
        // delete employee.department.employees;
        response.status(201).send(employee);
      }
    } catch (err) {
      next(err);
    }
  };

  public updateEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const role = request.role;
      if (role != Role.HR) {
        throw new HttpException(403, "YOU DO NOT HAVE ACCES", "NO ACCESS");
      }
      const employeeDto = plainToInstance(CreateEmployeeDto, request.body);
      const errors = await validate(employeeDto);
      if (errors.length != 0) {
        const error = new HttpException(
          404,
          "Validation failed",
          JSON.stringify(errors)
        );
        throw error;
      }

      const employee = await this.employeeService.updateEmployee(
        Number(request.params.employeeId),
        employeeDto.email,
        employeeDto.name,
        employeeDto.age,
        employeeDto.address,
        employeeDto.department,
        employeeDto.status,
        employeeDto.experience
      );
      response.status(201).send(employee);
    } catch (err) {
      console.log("put or update failed");
      next(err);
    }
  };

  public deleteEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const role = request.role;
      if (role != Role.HR) {
        throw new HttpException(403, "YOU DO NOT HAVE ACCES", "NO ACCESS");
      }
      const employee = await this.employeeService.getEmployeeById(
        Number(request.params.employeeId)
      );
      if (!employee) {
        const error = new HttpException(
          404,
          "missing employee",
          `no employee of ${request.params.employeeId} id!`
        );
        throw error;
      } else {
        const result = await this.employeeService.deleteEmployee(
          Number(request.params.employeeId)
        );
        response.status(204).send(result);
      }
    } catch (err) {
      next(err);
    }
  };

  public loginEmployee = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = request.body;

      const token = await this.employeeService.loginEmployee(email, password);
      console.log(token);
      response.status(200).send({ data: token });
    } catch (err) {
      next(err);
    }
  };
}

export default EmployeeController;
