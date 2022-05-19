import { arraysEqual } from "./utils.js";

const getPrice = (menu, user) => {
  return menu.find((combo) => {
    return arraysEqual(combo.combo, user.options);
  }).price;
};

const packIdCombo = (arr) => {
  return arr.join("_");
};

const unPackIdCombo = (str) => {
  return str.split("_");
};

export const getFood = (food, item) => {
  return `${food[item]}`;
};

export const getCombo = (food, combo) => {
  return combo.map((item) => getFood(food, item)).join(" + ");
};

export const textCombo = (food, { combo, price }) => {
  return getCombo(food, combo).concat(" = ").concat(price);
};

export const textMenu = ({ food, menu }) => {
  return menu.map((combo) => textCombo(food, combo)).join("\n");
};

const userOrderPrice = ({ food, menu }, { users }) => {
  return users
    .map((user) => `${user.name} = ${getPrice(menu, user)}p`)
    .join("\n");
};

const userOrderCombo = ({ food, menu }, { users }) => {
  return users
    .map((user) => {
      return `${user.name} = ${getCombo(food, user.options)}`;
    })
    .join("\n");
};

const allOrderCombo = ({ food }, { users }) => {
  const combos = {};

  users.forEach((user) => {
    const combo = user.options;
    const id = packIdCombo(combo);

    if (combos.hasOwnProperty(id)) {
      combos[id] += 1;
    } else {
      combos[id] = 1;
    }
  });

  return Object.entries(combos)
    .map(([id, count]) => {
      const combo = getCombo(food, unPackIdCombo(id));
      return `${combo} x${count}`;
    })
    .join("\n");
};

export const order = {
  userOrderPrice,
  userOrderCombo,
  allOrderCombo,
};
