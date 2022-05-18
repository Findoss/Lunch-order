import "dotenv/config";
import Slimbot from "slimbot";
import { objToStr, getCommand } from "./utils.js";

import {
  TG_TOKEN_BOT,
  TEST_CONTENT,
  ADMIN_IDS,
  ADMIN_COMMANDS,
  POLL_TIME_LIMIT,
} from "./config.js";

import { store } from "./store.js";
import { cafeMenu, cafePrice } from "./menu.js";

const slimbot = new Slimbot(TG_TOKEN_BOT);
const bot = {
  sendMsg(id, text) {
    slimbot.sendMessage(id, text, { parse_mode: "Markdown" }).catch((error) => {
      if (error.error_code === 400) {
        console.log(error.description);
        return;
      }

      throw new Error(error.message);
    });
  },
  sendPoll(id, { question, options, params }) {
    return slimbot
      .sendPoll(id, question, JSON.stringify(options), params)
      .then((data) => {
        if (data.ok) {
          return data;
        }
      })
      .catch((error) => {
        if (error.error_code === 400) {
          console.log(error.description);
          return;
        }

        throw new Error(error.message);
      });
  },
};

const test = (msg) => {
  const { chat } = msg;
  const { id } = chat;

  bot.sendMsg(id, `${TEST_CONTENT.text}\n${objToStr(msg)}`);
};

const poll = (msg) => {
  const { chat } = msg;
  const { id } = chat;

  const testPoll = {
    question: "question?",
    options: ["text1", "text2", "text3"],
    params: {
      is_anonymous: false,
      open_period: 5,
      allows_multiple_answers: true,
    },
  };

  bot.sendPoll(id, testPoll);
};

const start = (msg) => {
  const { chat } = msg;
  const { id } = chat;

  if (store.isProccessPoll()) {
    bot.sendMsg(
      id,
      `Ты куда торопишься? Дай отдохнуть от опроса id***${store.idPoll}***`
    );
    return;
  }

  const objPoll = {
    question: "Заказываем обед",
    options: Object.values(cafeMenu),
    params: {
      is_anonymous: false,
      open_period: POLL_TIME_LIMIT,
      allows_multiple_answers: true,
    },
  };

  bot
    .sendPoll(id, objPoll)
    .then((data) => {
      const { message_id } = data.result;
      store.setPoll(message_id);
      return message_id;
    })
    .then(() => {
      setTimeout(() => {
        store.saveOrder();

        bot.sendMsg(id, store.getLastOrderText());

        console.log(store);
      }, (POLL_TIME_LIMIT + 1) * 1000);
    });
};

const help = (msg) => {
  const { chat } = msg;
  const { id } = chat;

  const helpText = `
    Справочник 
    ***Общие команды***
      /help - справка
      /menu - меню с ценами

    Создатель @findoss
  `;

  bot.sendMsg(id, helpText);
};

const menu = (msg) => {
  const { chat } = msg;
  const { id } = chat;

  const cafePriceMenu = cafePrice
    .map((v) => {
      let str = "";
      str += v.combo.reduce((acc, v, i) => {
        if (i > 0) acc += "+ ";
        acc += `${cafeMenu[v]} `;
        return acc;
      }, "");
      str += `= ***${v.price}***р`;
      return str;
    })
    .join("\n");

  const text = `***Оголодавший, вот меню*** \n\n${cafePriceMenu}`;

  bot.sendMsg(id, text);
};

const commands = {
  test,
  help,
  poll,
  start,
  menu,
};

slimbot.on("message", (msg) => {
  const cmd = getCommand(msg.text);

  if (ADMIN_COMMANDS.includes(cmd) && !ADMIN_IDS.includes(msg.from.id)) {
    bot.sendMsg(msg.chat.id, "Не суетись, я слушаюсь только @Findoss");
    return;
  }

  if (commands.hasOwnProperty(cmd)) {
    commands[cmd](msg);
  }
});

slimbot.on("poll", (msg) => {
  console.log("poll");
});

slimbot.on("poll_answer", (msg) => {
  store.addAnswer({
    name: `${msg.user.first_name} ${msg.user.last_name}`,
    username: msg.user.username,
    options: msg.option_ids.map((i) => Object.keys(cafeMenu)[i]),
  });
});

slimbot.startPolling();
// slimbot.stopPolling();
