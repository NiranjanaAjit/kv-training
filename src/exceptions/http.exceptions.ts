export default class HttpException extends Error {
    public status: number;
    public error: string;

    constructor(status: number, error: string, message: string){
        super(message);
        this.error =  error;
        this.status = status;
    }

}