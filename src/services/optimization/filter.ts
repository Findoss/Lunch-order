import type { Order, OrderCombo } from '../../models/order/types';

export const filterCombo = (allCombos: OrderCombo[]) => {
  const combos: OrderCombo[] = [];

  let i = 0;
  while (allCombos.length > 0) {
    const combo = allCombos[i];

    // добавление в итоговый
    combos.push(combo);

    // удаление из массива
    const userNamesCombo = combo.combo.map((v) => v.username);
    allCombos = allCombos.filter((v) => {
      return !v.combo.some((p) => userNamesCombo.includes(p.username));
    });

    i = 0;
  }

  console.log('allCombos', JSON.stringify(allCombos, null, 2));
  console.log('combos', JSON.stringify(combos, null, 2));
  return combos;
};
