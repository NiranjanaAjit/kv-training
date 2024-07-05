import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exceptions"

const errorMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (error instanceof HttpException) {
            const errorName: string = error.error; 
            const status: number = error.status || 500;
            const message: JSON = JSON.parse(error.message )[0]|| {error: "Something went wrong"};
            const errorArray = Object.values(message["constraints"]);
            let respbody = { error: errorName, statusCode: status, errors: error.message };
            res.status(status).json(respbody);
        } else {
            console.error(error.stack);
            res.status(500).send({ error: error.message });
        }
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;