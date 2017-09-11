const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');
const {botToken} = require('../cfg');
const taskController = require('../controllers/taskController');

const bot = new TelegramBot(botToken, {polling: true});
mongoose.connect('mongodb://localhost/test', {
  useMongoClient: true,
})
  .then(() => {
    // Matches "/echo [whatever]"
    bot.onText(/\/task (.+)/, (msg, match) => {
      // 'msg' is the received Message from Telegram
      // 'match' is the result of executing the regexp above on the text content
      // of the message
      const chatId = msg.chat.id;
      const resp = match[1]; // the captured "whatever"
      bot.sendMessage(chatId, resp);
    });

    bot.onText(/\/show_task (.+)/, (msg, match) => {
      const id = match[1];
      const task = taskController.show(id);
      bot.sendMessage(msg.chat.id, task);
    });

    bot.onText(/\/create_task (\d\d-\d\d-\d\d\d\d) (.+)/, (msg, match) =>
      // const words = msg.text.split(' ');
      // maybe different ways
      taskController.create({
        deadline: match[1],
        desc: match[2]
      })
    );
    // bot.on('message', (msg) => {
    //   const chatId = msg.chat.id;
    //   // send a message to the chat acknowledging receipt of their message
    //   bot.sendMessage(chatId, `${msg.from.first_name} is gay but he said: ${msg.text}`);
    // });

    const showshowWeekOrDayButtons = (msg, myBot) => {
      myBot.sendMessage(msg.chat.id, 'Как вы хотите посмотреть расписание?', {
        reply_markup: JSON.stringify({
          keyboard: [['По дням'], ['По неделям']],
          force_reply: true,
          one_time_keyboard: true
        })
      }).then(sentMessage => {
        myBot.onReplyToMessage(sentMessage.chat.id, sentMessage.message_id, reply => {
          if (reply.text === 'По дням') {
            myBot.sendMessage(msg.chat.id, 'Окей щас по дням раскидаем');
          } else {
            myBot.sendMessage(msg.chat.id, 'Недели так недели');
          }
        });
        // bot.once('message', (msg) => {
        //   if (msg.text === 'По дням') {
        //     bot.sendMessage(msg.chat.id, 'Окей щас по дням раскидаем')
        //   } else {
        //     bot.sendMessage(msg.chat.id, 'Недели так недели')
        //   }
        // });
      });
    };

    bot.onText(/\/show_schedule/, msg => showshowWeekOrDayButtons(msg, bot));
  })
  .catch(err => {
    console.log(err);
  });
