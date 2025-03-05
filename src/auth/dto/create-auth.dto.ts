import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty()  
    username: string;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
    age: number;
    address: string;
    @IsNotEmpty()
    sex:boolean
}
