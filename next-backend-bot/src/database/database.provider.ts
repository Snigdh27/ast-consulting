import { Provider } from '@nestjs/common';
import * as mongoose from 'mongoose';

export const databaseProviders: Provider[] = [
  {
    provide: 'DATABASE_CONNECTION', 
    useFactory: async (): Promise<typeof mongoose> => {
      try {
        const uri = process.env.DATABASE_CONNECTION_STRING;

        const connection = await mongoose.connect(uri);

        return connection;
      } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
      }
    },
  },
];

