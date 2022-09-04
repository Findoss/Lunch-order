import type { ContextTelegraf } from '../../services/telegram/types';
import { selectAllOrders } from '../../models/order';

const MOUNSE = 1000 * 60 * 60 * 24 * 28;

export const stats = (ctx: ContextTelegraf) => {
  const dateNow = Date.now();
  const lastMounse = dateNow - MOUNSE;

  const orders = selectAllOrders();

  const allProfit = orders.reduce((acc, order) => {
    if (order.date > lastMounse) {
      const profitOrder = order.order.reduce((acc, combo) => {
        return (acc += combo.profit);
      }, 0);

      return (acc += profitOrder);
    }
    return acc;
  }, 0);

  ctx.replyWithMarkdown(`Экономия за последний месяц составила ${allProfit}р`);
};
