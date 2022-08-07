export type Food = 'salad' & 'sup' & 'dish';

export type Foods = Record<Food, string>;

export type Combo<T> = {
  combo: (keyof T)[];
  price: number;
};

export type Cafe = {
  food: Foods;
  menu: Combo<Foods>[];
  optimization: never[];
};
