import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository"

class  EmployeeService {

 constructor(private employeeRepository : EmployeeRepository) {
   
 }

getAllEmployees = async () : Promise<Employee[]> => {
    console.log(this.employeeRepository.find());
    return this.employeeRepository.find();
 }

getEmployeeById =  async (id: number) : Promise<Employee | null> => {
    return this.employeeRepository.findOneBy({id})
 }

createEmployee = async (email: string, name: string, age: number, address: any) : Promise<Employee> => {
    const newEmployee = new Employee();

    newEmployee.email = email;
    newEmployee.age = age;
    newEmployee.name = name;
    const newAddress = new Address();
    newAddress.line1 = address.line1;
    newAddress.pincode = address.pincode;
    newEmployee.address = newAddress;
    console.log(newEmployee);
    return this.employeeRepository.save(newEmployee);
 }

 updateEmployee = async (id: number, email: string, name: string, age: number, address: any) : Promise<Employee>  => {
    let employee = await this.employeeRepository.findOneBy({id});
    if (employee == null){
        return null;
    }
    employee.name = name;
    employee.email = email;
    employee.age = age;
    employee.address.line1 = address.line1;
    employee.address.pincode = address.pincode;
    return this.employeeRepository.save(employee);
 }

deleteEmployee =  async (id: number): Promise<void>  => {
    let employee = await this.employeeRepository.findOneBy({id});
    await this.employeeRepository.remove(employee);
 }

}


export default EmployeeService