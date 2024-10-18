import { UserRole } from "enums/userRoles.enum";


interface tempToken{
    id:number,
    email:string,
    role:UserRole,
    expiresIn:string
}