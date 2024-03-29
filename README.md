# Weather Bot Telegram - Nest.js

Weather Bot Telegram is a Telegram bot built using Nest.js that provides weather updates to subscribed users. Users can register to receive weather updates for a specific city.

## Features

- Users can subscribe to receive weather updates.
- Weather updates are sent periodically to subscribed users.
- Users can unsubscribe to stop receiving weather updates.
- MongoDB is used to store user data.
- Integration with the OpenWeatherMap API for weather data.

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)

## Getting Started

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/yourusername/weather-bot-telegram.git
   ```
2. Run the Admin Dashboard
    ```
   cd weather-bot-telegram
   npm install
   ```
3. Create a .env file in the project root and configure your environment variables:
    ```
    TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
    CITY=YOUR_DEFAULT_CITY
    MONGODB_URI=YOUR_MONGODB_CONNECTION_URI
    OPENWEATHERMAP_API_KEY=YOUR_OPENWEATHERMAP_API_KEY
    ```
    
4. Start the Nest.js application:
    ```
    npm start
    ```
5. Your Telegram bot is now running and ready to receive commands.

6. Users can interact with the bot by sending commands like /subscribe and /unsubscribe.


![image](https://github.com/Snigdh27/ast-consulting/assets/74950528/83ade6b6-fcd7-48ff-a6a3-27d66bec159a)


### Telegram bot

![image](https://github.com/Snigdh27/ast-consulting/assets/74950528/c1e7810b-8656-4469-accb-06858c624c25)

