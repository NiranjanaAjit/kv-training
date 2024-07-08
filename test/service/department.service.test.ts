import { when } from "jest-when";
import Department from "../../src/entity/department.entity";
import DepartmentRepository from "../../src/repository/department.repository";
import DepartmentService from "../../src/service/department.service";
import { DepartmentDto } from "../../src/dto/department.dto";

describe('Department Service', () => {
    let departmentRepository:DepartmentRepository;
    let departmentService: DepartmentService;
    beforeAll( () => {
        const dataSource = {
            getRepository: jest.fn()
        };
        departmentRepository = new DepartmentRepository(dataSource.getRepository(Department)) as jest.Mocked<DepartmentRepository>;
        departmentService = new DepartmentService(departmentRepository);
    })

    it('should return all Departments',async () => {
        const mock = jest.fn(departmentRepository.find).mockResolvedValue([]);
        departmentRepository.find = mock;

        const departments = await departmentService.getAllDepartments();

        expect(departments).toEqual([]);
        expect(mock).toHaveBeenCalledTimes(1);
    })

    it('should return one Department of id', async ()=> {
        const mock =  jest.fn();
        when(mock).calledWith({id: 2})
        .mockResolvedValue({id: 2,"departmentName": "sample"} as Department);
        departmentRepository.findOneBy = mock;

        const department = await departmentService.getDepartmentById(2);

        expect(department.departmentName).toEqual("sample");
        expect(mock).toHaveBeenCalledTimes(1);
    })

    // it('should create a department', async() => {
    //     const mock = jest.fn(departmentRepository.save).mockRejectedValue([]);
    //     departmentRepository.save = mock;

    //     const departments = await departmentService.createDepartment({departmentDto: DepartmentDto});

    //     expect(departments).toEqual([]);
    //     expect(mock).toHaveBeenCalledTimes(1);

    // })
})