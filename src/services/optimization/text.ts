import type { Cafe, Combo, Food, Foods } from '../../models/cafe/types';
import type { Order, OrderCombo } from '../../models/order/types';

import { arraysEqual } from '../../utils/array-equal';
import { getOnlyUserCombo } from './selectors';

export const textFood = (food: Foods, item: keyof Foods): string => {
  return `${food[item]}`;
};

export const textCombo = (
  food: Foods,
  combo: Combo<Foods>['combo']
): string => {
  return combo.map((item) => textFood(food, item)).join(' + ');
};

export const textMenuPrice = (
  food: Foods,
  { combo, price }: Combo<Foods>
): string => {
  return textCombo(food, combo).concat(' = ').concat(String(price));
};

export const textMenu = ({ food, menu }: Cafe): string => {
  return menu.map((combo) => textMenuPrice(food, combo)).join('\n');
};

export const textUserFood = (combos: OrderCombo[], cafe: Cafe) => {
  return combos
    .map((combo) =>
      combo.combo.map((v) => `${v.name} = ${textCombo(cafe.food, v.keys)}`)
    )
    .flat(1)
    .join('\n');
};

type variantOrder = Order | OrderCombo;
type accCombo = { keys: Food[]; count: number }[];
export const textComboOrder = (combos: variantOrder[], cafe: Cafe) => {
  return combos
    .reduce((acc: accCombo, combo) => {
      const realCombo = acc.find((v) => arraysEqual(v.keys, combo.keys));

      if (!realCombo) {
        acc.push({ keys: combo.keys, count: 1 });
      } else {
        realCombo.count += 1;
      }
      return acc;
    }, [] as accCombo)
    .map(({ keys, count }: { keys: Food[]; count: number }) => {
      return `${textCombo(cafe.food, keys)} x${count}`;
    })
    .join('\n');
};

export const textComboOriginalOrder = (combos: OrderCombo[], cafe: Cafe) => {
  const result = getOnlyUserCombo(combos);
  return textComboOrder(result, cafe);
};

export const textComboOptimazeOrder = (combos: OrderCombo[], cafe: Cafe) => {
  const result = combos;
  return textComboOrder(result, cafe);
};

export const textUserOrderCost = (combos: OrderCombo[]) => {
  return getOnlyUserCombo(combos)
    .map((v) => `${v.name} = ${v.cost}р`)
    .join('\n');
};

export const textUserOrderPrice = (combos: OrderCombo[]) => {
  return getOnlyUserCombo(combos)
    .map((v) => `${v.name} = ${v.price}р`)
    .join('\n');
};

export const textAllPrice = (combos: OrderCombo[]) => {
  return getOnlyUserCombo(combos).reduce((acc, v) => (acc += v.price), 0);
};

export const textAllCost = (combos: OrderCombo[]) => {
  return getOnlyUserCombo(combos).reduce((acc, v) => (acc += v.cost ?? 0), 0); // TODO
};

export const textOrder = (combos: OrderCombo[], cafe: Cafe) => {
  const text = [
    '**Ваши заказы** \n\n',
    textUserFood(combos, cafe),
    '\n\n',
    '**Общий заказ** \n\n',
    textComboOriginalOrder(combos, cafe),
    '\n\n',
    '**Итог** ',
    textAllPrice(combos) + 'p',
    '\n\n',
    textUserOrderPrice(combos),
  ].join('');

  return text;
};

export const textOrderOptimization = (combos: OrderCombo[], cafe: Cafe) => {
  const profit = textAllPrice(combos) - textAllCost(combos);
  const text = [
    '**Ваши заказы** \n\n',
    textUserFood(combos, cafe),
    '\n\n',
    '**Общий заказ** \n\n',
    textComboOptimazeOrder(combos, cafe),
    '\n\n',
    '**Итог** ',
    textAllCost(combos) + 'p',
    profit ? ` (выгода ${profit}p)` : '',
    '\n\n',
    textUserOrderCost(combos),
  ].join('');

  return text;
};

export const textReportOrder = (combos: OrderCombo[], cafe: Cafe) => {
  const text = [
    'Отчет по оптимизации \n\n',
    textUserFood(combos, cafe),
    '\n\n',
    'Общий заказ \n\n',
    textComboOriginalOrder(combos, cafe),
    '\n---\n',
    textComboOptimazeOrder(combos, cafe),
    '\n\n',
    'Итог ',
    textAllPrice(combos) + 'p',
    '\n\n',
    textUserOrderPrice(combos),
    '\n--- ',
    textAllCost(combos) + 'p',
    '\n',
    textUserOrderCost(combos),
  ].join('');

  return text;
};
