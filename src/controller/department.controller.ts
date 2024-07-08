import { NextFunction, Router, Request, Response } from "express";
import HttpException from "../exceptions/http.exceptions";
import DepartmentService from "../service/department.service";
import { RequestWithUser } from "../utils/jwtPayload.types";
import { Role } from "../utils/role.enum";
import { plainToInstance } from "class-transformer";
import { DepartmentDto } from "../dto/department.dto";
import { validate } from "class-validator";
import authorize from "../middleware/authorize.middleware";

export default class DepartmentController {
  public router: Router;

  constructor(private departmentService: DepartmentService) {
    this.router = Router();
    this.router.get("/", this.getAllDepartments);
    this.router.get("/:departmentId", this.getDepartmentById);
    this.router.post("/",authorize,this.createDepartment);
    this.router.put("/:departmentId",authorize, this.updateDepartment);
    this.router.delete("/:departmentId", authorize, this.deleteDepartment);
  }

  public getAllDepartments = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const departments = await this.departmentService.getAllDepartments();
      if (!departments) {
        const error = new HttpException(
          404,
          "missing department",
          "no department records!"
        );
        throw error;
      }
      response.status(200).send(departments);
    } catch (err) {
      next(err);
    }
  };

  public getDepartmentById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const department = await this.departmentService.getDepartmentById(
        Number(request.params.departmentId)
      );
      if (!department) {
        const error = new HttpException(
          404,
          "missing department",
          `no department of ${request.params.departmentId} id!`
        );
        throw error;
      }
      response.status(200).send(department);
    } catch (err) {
      next(err);
    }
  };



  public createDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
        const role = request.role;
        if(role!=Role.HR){
            throw new HttpException(403,"YOU DO NOT HAVE ACCES","NO ACCESS");
        }
      const departmentDto = plainToInstance(DepartmentDto, request.body);
      const errors = await validate(departmentDto);
      console.log(typeof errors, errors);
      if (errors.length != 0) {
        const error = new HttpException(
          404,
          "Validation Failed",
          JSON.stringify(errors)
        );
        throw error;
      } else {
        const department = await this.departmentService.createDepartment(departmentDto);
        response.status(201).send(department);
      }
    } catch (err) {
      next(err);
    }
  };


  public updateDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      console.log("updating department")
      const role = request.role;
      if(role!=Role.HR){
          throw new HttpException(403,"YOU DO NOT HAVE ACCES","NO ACCESS");
      }
      const departmentDto = plainToInstance(DepartmentDto, request.body);
      const errors = await validate(departmentDto);
      if (errors.length != 0) {
        const error = new HttpException(
          404,
          "Validation failed",
          JSON.stringify(errors)
        );
        throw error;
      }
      
      const department = await this.departmentService.updateDepartment(
        Number(request.params.departmentId),
        departmentDto.departmentName,
      );
      response.status(201).send(department);
    } catch (err) {
      console.log("put or update failed");
      next(err);
    }
  };

  public deleteDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const role = request.role;
      if(role!=Role.HR){
          throw new HttpException(403,"YOU DO NOT HAVE ACCES","NO ACCESS");
      }
      const department = await this.departmentService.getDepartmentById(
        Number(request.params.departmentId)
      );
      if (!department) {
        const error = new HttpException(
          404,
          "missing department",
          `no department of ${request.params.departmentId} id!`
        );
        throw error;
      };
      if(department.employees.length != 0){
        console.log(`employeees ${department.employees}, length ${department.employees.length}`);
        throw new HttpException(
            200,
            "department not empty",
            "no employee should belong to this department for successfull deletion"
        );
      }
      
      else {
        // const result = {
        //     "message ": "hi"
        // }
        const result = await this.departmentService.deleteDepartment(
          Number(request.params.departmentId)
        );
        response.status(200).send(result);
      }
    } catch (err) {
      next(err);
    }
  };

  public getDepartmentByName = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const department = await this.departmentService.getDepartmentByName(
        request.body.department.departmentName
      );
      if (!department) {
        const error = new HttpException(
          404,
          "missing department",
          `no department of ${request.body.department.departmentName} name!`
        );
        throw error;
      }
      response.status(200).send(department);
    } catch (err) {
      next(err);
    }
  };


}
