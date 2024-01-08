// admin.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  private apiKey = '751929c828bb584dea97c41ca414bf25'; // Initial API key
  private users: string[] = []; // Store user data here

  getApiKey(): string {
    return this.apiKey;
  }

  setApiKey(key: string): string {
    this.apiKey = key;
    return 'API key updated successfully';
  }

  getUsers(): string[] {
    return this.users;
  }
}
