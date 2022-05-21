import "dotenv/config";
import Slimbot from "slimbot";
import { objToStr, getCommand } from "./utils.js";

import { TG_TOKEN_BOT, ADMIN_COMMANDS, ADMIN_USERNAME } from "./config.js";

import { store } from "./store.js";
import { menu as cafeMenu } from "./menu.js";
import { order, textMenu } from "./order.js";

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

  const text = "Да, ___тест___ | "
    .concat("[успешно пройден]")
    .concat(
      "(https://ru.wikipedia.org/wiki/Тестирование_программного_обеспечения)"
    );

  bot.sendMsg(id, `${text}\n${objToStr(msg)}`);
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

const start = (msg, params) => {
  const { chat } = msg;
  const { id } = chat;
  const idMenu = params[0] ?? 0;

  if (store.isProcessPoll()) {
    bot.sendMsg(
      id,
      `Ты куда торопишься? Дай отдохнуть от опроса id***${store.getPoll()}***`
    );
    return;
  }

  const objPoll = {
    question: "Заказываем обед",
    options: Object.values(cafeMenu[idMenu].cafe.food),
    params: {
      is_anonymous: false,
      open_period: store.config.pollTimeLimit,
      allows_multiple_answers: true,
    },
  };

  bot
    .sendPoll(id, objPoll)
    .then((data) => {
      const { message_id } = data.result;
      store.setPoll(message_id, idMenu);
      return message_id;
    })
    .then(() => {
      setTimeout(() => {
        store.saveOrder();
        store.save();

        const lastOrder = store.getLastOrder();

        if (lastOrder.users.length === 0) {
          bot.sendMsg(id, "Заказов нет");
          return;
        }

        const textAllOrder = order.allOrderCombo(
          cafeMenu[lastOrder.idMenu].cafe,
          lastOrder
        );

        const textUserOrder = order.userOrderCombo(
          cafeMenu[lastOrder.idMenu].cafe,
          lastOrder
        );

        const textOrderPrice = order.userOrderPrice(
          cafeMenu[lastOrder.idMenu].cafe,
          lastOrder
        );

        const text = `***Ваши заказы***\n\n`
          .concat(textUserOrder)
          .concat("\n\n")
          .concat("***Общий заказ***\n\n")
          .concat(textAllOrder)
          .concat("\n\n")
          .concat("***Итог***\n\n")
          .concat(textOrderPrice);

        bot.sendMsg(id, text);
      }, (store.config.pollTimeLimit + 1) * 1000);
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

const menu = (msg, params) => {
  const { chat } = msg;
  const { id } = chat;
  const idMenu = params[0] ?? 0;

  if (!cafeMenu.hasOwnProperty(idMenu)) {
    bot.sendMsg(id, "Такого меню нет");
    return;
  }

  const text = `***Оголодавший, вот меню***\n\n${textMenu(
    cafeMenu[idMenu].cafe
  )}`;

  bot.sendMsg(id, text);
};

const add_admin = (msg, params) => {
  const { chat } = msg;
  const { id } = chat;
  const username = params[0].replace("@", "");

  if (store.hasAdmin(username)) {
    bot.sendMsg(id, `@${username} уже в списке админов`);
    return;
  }

  store.addAdmin(username);
  store.save();
  bot.sendMsg(id, `Теперь @${username} в списке админов, повинуюсь`);
};

const remove_admin = (msg, params) => {
  const { chat } = msg;
  const { id } = chat;
  const username = params[0].replace("@", "");

  if (username === ADMIN_USERNAME) {
    bot.sendMsg(
      id,
      `@${username} тебя хотели удалить! но я этого никогда не сделаю!`
    );
    return;
  }

  if (!store.hasAdmin(username)) {
    bot.sendMsg(id, `@${username} нет в списке админов`);
    return;
  }

  store.removeAdmin(username);
  store.save();
  bot.sendMsg(id, `@${username} удален из админов`);
};

const set_poll_time = (msg, params) => {
  const { chat } = msg;
  const { id } = chat;
  const time = params[0] ?? 300;

  store.setPollTime(Number(time));
  store.save();
  bot.sendMsg(id, `Время опроса установлено на ${time} секунд`);
};

const commands = {
  test,
  help,
  poll,
  start,
  menu,
  add_admin,
  remove_admin,
  set_poll_time,
};

slimbot.on("message", (msg) => {
  const username = msg.from.username;
  const rawCmd = msg.text ?? msg.caption;
  const { cmd, params } = getCommand(rawCmd);

  if (
    ADMIN_COMMANDS.includes(cmd) &&
    !store.config.adminUsernames.includes(username)
  ) {
    bot.sendMsg(msg.chat.id, "Не суетись, я слушаюсь только @Findoss");
    return;
  }

  if (commands.hasOwnProperty(cmd)) {
    commands[cmd](msg, params);
  }
});

slimbot.on("poll_answer", (msg) => {
  console.log(store.poll.idMenu);
  store.addAnswer({
    name: `${msg.user.first_name} ${msg.user.last_name ?? ""}`,
    username: msg.user.username,
    options: msg.option_ids.map(
      (i) => Object.keys(cafeMenu[store.poll.idMenu].cafe.food)[i]
    ),
  });
});

store.load();
slimbot.startPolling();
// slimbot.stopPolling();
