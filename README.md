# ChatGPT Bot
This is a Line chatbot that uses the OpenAI API to generate responses to user messages.

## Getting Started

1. Clone the repository to your local machine.
2. Install dependencies with npm install.
3. Create a .env file in the root directory and add the following environment variables:
``` makefile
Line_Channel_Access_Token=<Your Line channel access token>
Line_Channel_Secret=<Your Line channel secret>
OPENAI_API_KEY=<Your OpenAI API key>
```
4. Run the server with npm start.
5. Configure the Line channel to use the webhook URL https://your-url.amazonaws.com/dev/callback.
6. Start chatting with the bot!

## How it works
When a user sends a text message to the bot, the handleEvent function is called. This function uses the OpenAI API to generate a response to the user's message, and sends the response back to the user using the Line messaging API.

## API Reference
POST /callback
This endpoint is used by the Line messaging API to send events to the bot. The bot responds to text messages by calling the handleEvent function.

GET /about
This endpoint returns information about the bot.

## Deployment
To deploy the bot to AWS Lambda using the Serverless Framework, run the following command:

Copy code
```
serverless deploy
```
This will deploy the bot to AWS Lambda and generate a webhook URL that can be used to configure the Line channel.
