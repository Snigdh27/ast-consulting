import { UserService } from './user.service';
import { User } from './user.schema';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<User[]>;
    deleteUser(chatId: number): Promise<{
        message: string;
    }>;
}
