import { Model } from 'mongoose';
import { User } from './user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    createUser(chatId: number, username: string): Promise<User>;
    deleteUser(chatId: number): Promise<User | null>;
    getUsers(): Promise<User[]>;
    getUserByChatId(chatId: number): Promise<User | null>;
}
