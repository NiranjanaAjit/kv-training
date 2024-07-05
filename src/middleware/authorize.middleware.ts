import { NextFunction } from "express";
import {Response} from "express";
import { jwtPayload, RequestWithUser } from "../utils/jwtPayload.types";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";

const authorize = async (request: RequestWithUser, response: Response , next:NextFunction) => {
    try{


        const token = request.header("Authorization");
        const payload  = jsonwebtoken.verify(token,JWT_SECRET);
        request.name = (payload as jwtPayload).name;
        request.email = (payload as jwtPayload).email;
        request.role = (payload as jwtPayload).role;
        return next();
    }
    catch(error){
        next(error);
    }

}

export default authorize;