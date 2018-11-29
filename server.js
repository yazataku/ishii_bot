'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: '8483d15315eb2ac21638aba2025ae54b',
    channelAccessToken: 'RFunKxiBdLqlUMep33QaTdrMlMC4EwVDB0PklrKVO5enLHXQbl8eadb0lwsXYYsnJE1wFkTumvB3Nlih+v0ddanXUQiK612SdHvHY9apeMp9DDNuviCZ8u+7pnBfdBA0tWzCWTTu5iXAh29gW1xN+wdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text //実際に返信の言葉を入れる箇所
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
