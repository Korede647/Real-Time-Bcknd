import { User } from "@prisma/client";
import { CreateUserDTO } from "../dto/CreateUserDTO";

export interface UserService {
    createUser(data: CreateUserDTO): Promise<User>
    getAllUsers(): Promise<User[]>
    
}