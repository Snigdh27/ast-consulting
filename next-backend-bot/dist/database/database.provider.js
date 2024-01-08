"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const mongoose = require("mongoose");
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
            try {
                const uri = process.env.DATABASE_CONNECTION_STRING;
                const connection = await mongoose.connect(uri);
                return connection;
            }
            catch (error) {
                console.error('MongoDB connection error:', error);
                throw error;
            }
        },
    },
];
//# sourceMappingURL=database.provider.js.map