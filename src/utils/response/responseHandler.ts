import { ApiResponse } from "src/interfaces/apiResponse.interface";


export function createResponse<T>(data:T,message:string,statusCode:number,token?:string):ApiResponse<T> {

    return {
        message,
        data,
        statusCode,
        token
      };
}