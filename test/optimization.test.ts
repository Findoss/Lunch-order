import type { OrderCombo } from '../src/models/order/types';

import { createOrder } from '../src/services/optimization';

import { cafe } from './mocks/cafe/cafe';
import {
  a1,
  a2,
  a3,
  a4,
  a5,
  a6,
  a7,
  a8,
  a9,
  a10,
} from './mocks/answers/answers';
import {
  o1,
  o2,
  o3,
  o4,
  o5,
  o6,
  o7,
  o8,
  o9,
  o10,
} from './mocks/combos/keys-combos';

const getKeys = (combos: OrderCombo[]) => combos.map((v) => v.keys);

describe('Оптимизация', () => {
  test('(Суп) + (Суп) = без оптимизации', () => {
    const { optimizitionOrder } = createOrder(cafe, a1);

    const result = getKeys(optimizitionOrder);

    expect(result).toEqual(o1);
  });

  test('(Суп) + (Салат)', () => {
    const { optimizitionOrder } = createOrder(cafe, a2);

    const result = getKeys(optimizitionOrder);

    expect(result).toEqual(o2);
  });

  test('(Суп + Салат) + Горячее', () => {
    const { optimizitionOrder } = createOrder(cafe, a3);

    const result = getKeys(optimizitionOrder);

    expect(result).toEqual(o3);
  });

  test('Суп + (Салат + Горячее)', () => {
    const { optimizitionOrder } = createOrder(cafe, a4);

    const result = getKeys(optimizitionOrder);

    expect(result).toEqual(o4);
  });

  test('(Суп) + (Салат) + (Горячее)', () => {
    const { optimizitionOrder } = createOrder(cafe, a5);

    const result = getKeys(optimizitionOrder);

    expect(result).toEqual(o5);
  });

  test('(Суп + Салат) + (Горячее) + (Горячее)', () => {
    const { optimizitionOrder } = createOrder(cafe, a6);

    const result = getKeys(optimizitionOrder);

    expect(result).toEqual(o6);
  });

  test('(Суп + Салат) + (Суп + Салат) + (Горячее)', () => {
    const { optimizitionOrder } = createOrder(cafe, a7);

    const result = getKeys(optimizitionOrder);

    expect(result).toEqual(o7);
  });

  test('(Суп + Салат) + (Суп) + (Горячее)', () => {
    const { optimizitionOrder } = createOrder(cafe, a8);

    const result = getKeys(optimizitionOrder);

    expect(result).toEqual(o8);
  });

  test('(Суп + Салат) + (Суп) + (Горячее)', () => {
    const { optimizitionOrder } = createOrder(cafe, a8);

    const result = getKeys(optimizitionOrder);

    expect(result).toEqual(o8);
  });

  test('(Суп + Салат) + (Горячее) + (Суп) + (Салат)', () => {
    const { optimizitionOrder } = createOrder(cafe, a9);

    const result = getKeys(optimizitionOrder);

    expect(result).toEqual(o9);
  });

  test('(Суп + Салат) + (Горячее) + (Суп) + (Горячее)+ (Суп)', () => {
    const { optimizitionOrder } = createOrder(cafe, a10);

    const result = getKeys(optimizitionOrder);

    expect(result).toEqual(o10);
  });
});
