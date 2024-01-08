import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getApiKey(): string;
    setApiKey(apiKey: {
        key: string;
    }): string;
    getUsers(): string[];
}
