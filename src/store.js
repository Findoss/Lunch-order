import { cafeMenu, cafePrice } from "./menu.js";

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
    const lastOrder = this.orders.at(-1).users;
    const textUserOrder = formatUserOrder(lastOrder);
    const textComnboCount = formatComnboCount(lastOrder);
    let text = `***Голодные, ваши заказы такие***\n\n`;
    text += `${textUserOrder}`;
    text += `\n***Общий заказ***${sumOrder(lastOrder)}\n\n`;
    text += `${textComnboCount}`;

    return text;
  },
};

const getCombo = (users) => {
  const combo = {};

  users.forEach((user) => {
    const idCombo = user.options.join("_");
    if (combo.hasOwnProperty(idCombo)) {
      combo[idCombo] += 1;
    } else {
      combo[idCombo] = 1;
    }
  });

  return combo;
};

const sumOrder = (users) => {
  const combo = getCombo(users);

  const comboPrice = {};
  cafePrice.forEach((combo) => {
    const idCombo = combo.combo.join("_");
    if (!comboPrice.hasOwnProperty(idCombo)) {
      comboPrice[idCombo] = combo.price;
    }
  });

  const sum = Object.entries(combo).reduce((acc, [k, v]) => {
    acc += comboPrice[k] * v;
    return acc;
  }, 0);

  return sum;
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
  const combo = getCombo(users);

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
