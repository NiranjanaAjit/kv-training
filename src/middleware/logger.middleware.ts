import {Request, Response} from "express";


const loggerMiddleware = (request : Request, response : Response, next ) => {
    console.log(`[${new Date(). toISOString()}]${request.url}`);
    
    console.log(`request body : ${request.body}`)
    next();
}

export default loggerMiddleware;