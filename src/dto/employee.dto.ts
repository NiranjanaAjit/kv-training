import { IsEmail, IsEnum, isEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator"
import Address from "../entity/address.entity"
import { CreateAddressDto } from "./address.dto"
import { Type } from "class-transformer"
import "reflect-metadata"
import { Role } from "../utils/role.enum"
import Department from "../entity/department.entity"
import { DepartmentDto } from "./department.dto"

export class CreateEmployeeDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;
    
    @IsNotEmpty()
    @IsNumber()
    age: number;


    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(() => CreateAddressDto)
    address: CreateAddressDto;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;


    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(() => DepartmentDto)
    department: DepartmentDto;
}