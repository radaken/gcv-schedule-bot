const express = require('express')
const app = express()
const fs = require('fs')
const TelegramBot = require('node-telegram-bot-api')

let rawTokens = fs.readFileSync('./SENSETIVE/tokens.json')
let parsedTokens = JSON.parse(rawTokens)
const token = parsedTokens.telegramToken
rawTokens = null
parsedTokens = null

const bot = new TelegramBot(token, {polling: true})

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});




app.listen(3000, () => console.log('Server has been started on port 3000...'))
