import {
  textAllOrderCombo,
  textUserOrderCombo,
  textUserOrderPrice,
} from '../format/text-combo';
import type { Cafe } from '../models/cafe/types';
import type { Order } from '../models/order/types';

export const textOrder = (cafe: Cafe, order: Order): string => {
  const textAllOrder = textAllOrderCombo(cafe, order);
  const textUserOrder = textUserOrderCombo(cafe, order);
  const textOrderPrice = textUserOrderPrice(cafe, order);

  const text = `***Ваши заказы*** - оптимизация включена\n\n`
    .concat(textUserOrder)
    .concat('\n\n')
    .concat('***Общий заказ***\n\n')
    .concat(textAllOrder)
    .concat('\n\n')
    .concat('***Итог***\n\n')
    .concat(textOrderPrice);

  return text;
};

// export const textOrder = (cafe: Cafe, order: Order): string => {
//   const textAllOrder = textAllOrderCombo(cafe, order);
//   const textUserOrder = textUserOrderCombo(cafe, order);
//   const textOrderPrice = textUserOrderPrice(cafe, order);

//   const text = `***Ваши заказы***\n\n`
//     .concat(textUserOrder)
//     .concat('\n\n')
//     .concat('***Общий заказ***\n\n')
//     .concat(textAllOrder)
//     .concat('\n\n')
//     .concat('***Итог***\n\n')
//     .concat(textOrderPrice);

//   return text;
// };
