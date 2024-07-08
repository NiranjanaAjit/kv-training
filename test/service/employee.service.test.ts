import { getRepository } from "typeorm";
import EmployeeRepository from "../../src/repository/employee.repository"
import Employee from "../../src/entity/employee.entity";
import EmployeeController from "../../src/controller/employee.controller";
import EmployeeService from "../../src/service/employee.service";
import { when } from "jest-when";
import Department from "../../src/entity/department.entity";
import DepartmentService from "../../src/service/department.service";
import DepartmentRepository from "../../src/repository/department.repository";

describe('Employee Service', () => {
    let employeeRepository:EmployeeRepository;
    let employeeService: EmployeeService;
    let departmentService: DepartmentService;
    let departmentRepository: DepartmentRepository;
    beforeAll( () => {
        const dataSource = {
            getRepository: jest.fn()
        };
        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee)) as jest.Mocked<EmployeeRepository>;
        departmentRepository = new DepartmentRepository(dataSource.getRepository(Department)) as jest.Mocked<DepartmentRepository>;
        employeeService = new EmployeeService(employeeRepository, departmentRepository);
        // departmentRepository = new DepartmentRepository(dataSource.ge)
    })

    it('should return all employees',async () => {
        const mock = jest.fn(employeeRepository.find).mockResolvedValue([]);
        employeeRepository.find = mock;

        const users = await employeeService.getAllEmployees();

        expect(users).toEqual([]);
        expect(mock).toHaveBeenCalledTimes(1);
    })

    it('should return one employee of an id', async ()=> {
        const mock =  jest.fn();
        when(mock).calledWith({id: 1})
        .mockResolvedValue({id: 1,"name": "sample"} as Employee);
        employeeRepository.findOneBy = mock;

        const employee = await employeeService.getEmployeeById(1);

        expect(employee.name).toEqual("sample");
        expect(mock).toHaveBeenCalledTimes(1);
    })

    it('should delete an employee', async() => {

        const mock2 = jest.fn();
        when(mock2).calledWith({id: 2})
        .mockResolvedValue({id: 2,"name": "sample"} as Employee );
        employeeRepository.findOneBy = mock2;
        const mock = jest.fn();
        when(mock).calledWith({id:2,"name": "sample"})
        .mockResolvedValue([]);
        employeeRepository.remove = mock;

        const result = await employeeService.deleteEmployee(2) ;

        expect(result).toEqual(undefined);
        expect(mock).toHaveBeenCalledTimes(1);

    })


})