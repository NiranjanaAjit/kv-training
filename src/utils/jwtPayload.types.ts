import { Role } from "./role.enum";
import {Request} from "express";

export type jwtPayload = {
  name: string;
  email: string;
  role: Role;
};

export interface RequestWithUser extends Request {
  name: string;
  email: string;
  role: Role;  

}