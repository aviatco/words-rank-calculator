import { NextFunction, Request, Response} from "express";
import { HttpException } from "../utils/http.error.type";


export class errorHandler{

    handleHttpError(error: Error, request: Request, response: Response, next: NextFunction) {
        console.error('Got error', error)
        const httpErrorStatus: number = error && (error as HttpException).status;
        if (httpErrorStatus) {
            return response.status(httpErrorStatus).send({ error: error.message });
        }
        next(error);
    }

}