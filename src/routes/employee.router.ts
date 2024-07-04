import EmployeeController from "../controller/employee.controller";
import EmployeeRepository from "../repository/employee.repository";
import EmployeeService from "../service/employee.service";
import AppDataSource from "../db/data-source.db";
import Employee from "../entity/employee.entity";

const employeeController = new EmployeeController(new EmployeeService(new EmployeeRepository(AppDataSource.getRepository(Employee))));
const employeeRouter = employeeController.router;

export default employeeRouter;