import type { Cafe } from '../../models/cafe/types';

export const combosAvailable = (menu: Cafe['menu']) => {
  return menu.map((combo) => combo.combo);
};

export const maxComboEl = (menu: Cafe['menu']) => {
  return Math.max(...menu.map((combo) => combo.combo.length));
};
