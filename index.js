const express = require('express')
const app = express()
const fs = require('fs')
const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()

const tgBot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true})
// Matches "/echo [whatever]"
tgBot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  tgBot.sendMessage(chatId, resp);
});

tgBot.onText(/\/register/, function onBobs(msg){
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = "Введите номер телефона"
  tgBot.sendMessage(chatId, resp);
  tgBot.once('message', (msg) => {
    if (msg.text == "bobs") {
      responbobs = "Daaaaa"
    } else {
      responbobs = "Otprav bobs!!!! " + JSON.stringify(JSON.parse(msg.text))
    }
    tgBot.sendMessage(chatId, responbobs);
  })
})

// Matches /editable
tgBot.onText(/\/editable/, function onEditableText(msg) {
  const chatId = msg.chat.id;
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Edit Text',
            // we shall check for this value when we listen
            // for "callback_query"
            callback_data: 'edit'
          }
        ]
      ]
    }
  };
  tgBot.sendMessage(chatId, 'Original Text', opts);
});

//рандомный комментари й

tgBot.on('callback_query', function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;

  if (action === 'edit') {
    text = 'Edited Text';
  }

  tgBot.editMessageText(text, opts);
}); 
/*
tgBot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  tgBot.sendMessage(chatId, 'Received your message');
}); */
/*
const VkBot = require('node-vk-bot-api');

const botvk = new VkBot(process.env.TOKEN);

botvk.command('/start', (ctx) => {
  ctx.reply('Hello!');
});

botvk.startPolling();
*/

tgBot.on('polling_error', (err) => console.log(err))
app.listen(3000, () => console.log('Server has been started on port 3000...'))