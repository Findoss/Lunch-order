import type { Order, OrderCombo } from '../../models/order/types';

export const filterCombo = (allCombos: OrderCombo[]) => {
  const combos: OrderCombo[] = [];
  for (let i = 0; i < allCombos.length; i++) {
    const combo = allCombos[i];
    // добавление в итоговый
    combos.push(combo);
    // удаление из массива
    const userNamesCombo = combo.combo.map((v) => v.username);
    allCombos = allCombos.filter((v) => {
      return !v.combo.some((p) => userNamesCombo.includes(p.username));
    });
  }

  console.log('allCombos', JSON.stringify(allCombos, null, 2));
  console.log('combos', JSON.stringify(combos, null, 2));

  // сортируем самый выгодный
  // выбираем
  // удаляем юзеров
  // повторяем
  return combos;
};
