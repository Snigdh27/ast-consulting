"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const telegram_bot_1 = require("./telegram-bot");
const admin_module_1 = require("./admin/admin.module");
const admin_controller_1 = require("./admin/admin.controller");
const admin_service_1 = require("./admin/admin.service");
const database_module_1 = require("./database/database.module");
const user_module_1 = require("./user/user.module");
const mongoose_1 = require("@nestjs/mongoose");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [admin_module_1.AdminModule, user_module_1.UserModule, database_module_1.DatabaseModule, mongoose_1.MongooseModule.forRootAsync({
                useFactory: () => ({
                    uri: process.env.DATABASE_CONNECTION_STRING,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }),
            }),
            user_module_1.UserModule,],
        controllers: [app_controller_1.AppController, admin_controller_1.AdminController],
        providers: [app_service_1.AppService, telegram_bot_1.TelegramBotService, admin_service_1.AdminService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map