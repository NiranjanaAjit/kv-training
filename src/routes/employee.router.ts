import EmployeeController from "../controller/employee.controller";
import EmployeeRepository from "../repository/employee.repository";
import EmployeeService from "../service/employee.service";
import AppDataSource from "../db/data-source.db";
import Employee from "../entity/employee.entity";
import DepartmentService from "../service/department.service";
import DepartmentRepository from "../repository/department.repository";
import Department from "../entity/department.entity";

const employeeController = new EmployeeController(new EmployeeService(new EmployeeRepository(AppDataSource.getRepository(Employee)),new DepartmentRepository(AppDataSource.getRepository(Department))));
const employeeRouter = employeeController.router;

export default employeeRouter;