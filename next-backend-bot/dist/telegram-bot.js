"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramBotService = void 0;
const common_1 = require("@nestjs/common");
const TelegramBot = require("node-telegram-bot-api");
const node_fetch_1 = require("node-fetch");
const cron = require("node-cron");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const admin_service_1 = require("./admin/admin.service");
const user_service_1 = require("./user/user.service");
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
let CITY = process.env.CITY;
let TelegramBotService = class TelegramBotService {
    constructor(adminService, userService) {
        this.adminService = adminService;
        this.userService = userService;
        this.subscribedUsers = new Set();
        this.bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
        this.loadSubscribedUsers();
        this.registerCommands();
        cron.schedule('0 * * * *', () => {
            console.log("sending update");
            this.sendWeatherUpdatesToAll();
        });
    }
    registerCommands() {
        console.log("hello");
        this.bot.onText(/\/start/, async (msg) => {
            console.log("Hello");
            const chatId = msg.chat.id;
            const first_name = msg.from.first_name;
            this.bot.sendMessage(chatId, `Hi ${first_name}, welcome to the weather bot, you can subscribe by using the /subscribe command, and unsubscribe using /unsubscribe command}\nget familiar with the weather-bot commands\nTo search to particular city weather use command {/city cityName}\nUse {/weather} in order to get weather of ghaziabad which is by default.`);
        });
        this.bot.onText(/\/subscribe/, async (msg) => {
            console.log(msg);
            const chatId = msg.chat.id;
            const userId = msg.from.id;
            const username = msg.from.first_name;
            const existingUser = await this.userService.getUserByChatId(chatId);
            console.log(existingUser);
            if (existingUser) {
                this.bot.sendMessage(chatId, 'You are already registered.');
            }
            else {
                const user = await this.userService.createUser(userId, username);
                if (user) {
                    this.bot.sendMessage(chatId, 'You have been registered.');
                    this.subscribedUsers.add(chatId);
                    this.sendWeatherUpdate(chatId);
                }
                else {
                    this.bot.sendMessage(chatId, 'Registration failed. Please try again.');
                }
            }
        });
        this.bot.onText(/\/unsubscribe/, async (msg) => {
            const chatId = msg.chat.id;
            const existingUser = await this.userService.getUserByChatId(chatId);
            if (existingUser) {
                const deletedUser = await this.userService.deleteUser(chatId);
                if (deletedUser) {
                    this.subscribedUsers.delete(chatId);
                    this.bot.sendMessage(chatId, 'You have been unregistered.');
                }
                else {
                    this.bot.sendMessage(chatId, 'Unregistration failed. Please try again.');
                }
            }
            else {
                this.bot.sendMessage(chatId, 'You are not registered.');
            }
        });
        this.bot.onText(/\/city (.+)/, async (msg, match) => {
            const chatId = msg.chat.id;
            const cityName = match[1];
            const existingUser = await this.userService.getUserByChatId(chatId);
            if (existingUser) {
                this.sendCityWeather(chatId, cityName);
                console.log(cityName);
            }
            else {
                this.bot.sendMessage(chatId, 'You are not registered.');
            }
        });
        this.bot.onText(/\/weather/, async (msg) => {
            const chatId = msg.chat.id;
            const existingUser = await this.userService.getUserByChatId(chatId);
            if (existingUser) {
                this.sendWeatherUpdate(chatId);
            }
            else {
                this.bot.sendMessage(chatId, 'You are not registered.');
            }
        });
    }
    async sendWeatherUpdate(chatId) {
        var _a, _b, _c;
        const apiKey = this.adminService.getApiKey();
        console.log(apiKey);
        try {
            const response = await (0, node_fetch_1.default)(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${apiKey}`);
            if (!response.ok) {
                common_1.Logger.error('Failed to fetch weather data');
                return;
            }
            const data = (await response.json());
            const weatherDescription = (_a = data.weather[0]) === null || _a === void 0 ? void 0 : _a.description;
            const temperature = (_c = (((_b = data.main) === null || _b === void 0 ? void 0 : _b.temp) - 273.15)) === null || _c === void 0 ? void 0 : _c.toFixed(2);
            const message = `Weather in ${CITY}:\n${weatherDescription}\nTemperature: ${temperature}°C`;
            this.bot.sendMessage(chatId, message);
        }
        catch (error) {
            common_1.Logger.error('Error fetching weather data', error);
        }
    }
    async sendCityWeather(chatId, message) {
        var _a, _b, _c;
        const apiKey = this.adminService.getApiKey();
        console.log(apiKey);
        CITY = message;
        try {
            const response = await (0, node_fetch_1.default)(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${apiKey}`);
            if (!response.ok) {
                common_1.Logger.error('Failed to fetch weather data');
                return;
            }
            const data = (await response.json());
            const weatherDescription = (_a = data.weather[0]) === null || _a === void 0 ? void 0 : _a.description;
            const temperature = (_c = (((_b = data.main) === null || _b === void 0 ? void 0 : _b.temp) - 273.15)) === null || _c === void 0 ? void 0 : _c.toFixed(2);
            const message = `Weather in ${CITY}:\n${weatherDescription}\nTemperature: ${temperature}°C`;
            this.bot.sendMessage(chatId, message);
        }
        catch (error) {
            common_1.Logger.error('Error fetching weather data', error);
        }
    }
    async sendWeatherUpdatesToAll() {
        for (const chatId of this.subscribedUsers) {
            this.sendWeatherUpdate(chatId);
        }
    }
    async loadSubscribedUsers() {
        const users = await this.userService.getUsers();
        users.forEach((user) => {
            this.subscribedUsers.add(user.chatId);
        });
    }
};
exports.TelegramBotService = TelegramBotService;
exports.TelegramBotService = TelegramBotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_service_1.AdminService, user_service_1.UserService])
], TelegramBotService);
//# sourceMappingURL=telegram-bot.js.map