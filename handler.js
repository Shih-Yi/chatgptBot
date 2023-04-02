import { Client } from "@line/bot-sdk";
import serverless from "serverless-http";
import express from "express";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const config = {
  channelAccessToken: process.env.Line_Channel_Access_Token,
  channelSecret: process.env.Line_Channel_Secret,
};

const client = new Client(config);
const openAPIKey = process.env.OPENAI_API_KEY;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const handleEvent = async (event) => {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }
  const configuration = new Configuration({
    apiKey: openAPIKey,
  });
  const openai = new OpenAIApi(configuration);
  const openaiResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a wonderful and helpful assistant" },
      { role: "user", content: event.message.text },
    ],
    max_tokens: 2000,
    temperature: 0.2,
  });
  const response = openaiResponse.data.choices[0].message.content;
  const reply = { type: "text", text: response };
  const result = await client.replyMessage(event.replyToken, reply);
  return {
    statusCode: 200,
    body: { result: result },
  };
};

app.post("/callback", (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      res.status(500).end();
    });
});

app.get("/about", (req, res) => {
  res.send("This is the about page.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

export const chatgptBot = serverless(app);
