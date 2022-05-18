import { cafeMenu } from "./menu.js";

export const store = {
  poll: {
    idPoll: null,
    pollAnswers: [],
  },
  orders: [],

  isProccessPoll() {
    return this.poll.idPoll !== null;
  },

  setPoll(id) {
    this.poll.idPoll = id;
  },

  addAnswer(payload) {
    console.log(payload);
    this.poll.pollAnswers.push(payload);
  },

  saveOrder() {
    this.orders.push({
      id: this.poll.idPoll,
      users: this.poll.pollAnswers,
    });

    this.clear();
  },

  clear() {
    this.poll.idPoll = null;
    this.poll.pollAnswers = [];
  },

  getLastOrderText() {
    const textUserOrder = formatUserOrder(this.orders.at(-1).users);
    const textComnboCount = formatComnboCount(this.orders.at(-1).users);
    const text = `***Голодные, ваши заказы такие***\n\n${textUserOrder}\n***Общий заказ***\n\n${textComnboCount}`;

    return text;
  },
};

const formatUserOrder = (users) => {
  return users.reduce((acc, v) => {
    const orderText = v.options.map((v) => cafeMenu[v]).join(" ");
    acc += `${v.name} = ${orderText}`;
    acc += `\n`;
    return acc;
  }, "");
};

const formatComnboCount = (users) => {
  const combo = {};

  users.forEach((user) => {
    const idCombo = user.options.join("_");
    if (combo.hasOwnProperty(idCombo)) {
      combo[idCombo] += 1;
    } else {
      combo[idCombo] = 1;
    }
  });

  return Object.entries(combo).reduce((acc, [k, v]) => {
    acc += k
      .split("_")
      .map((v) => cafeMenu[v])
      .join(" ");

    acc += " x";
    acc += v;
    acc += "\n";
    return acc;
  }, "");
};
