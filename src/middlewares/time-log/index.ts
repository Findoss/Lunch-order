/* eslint-disable no-console */

import type { MiddlewareFn } from 'grammy';
import type { ContextTelegraf } from '../../services/telegram/types';

export const timeLog: MiddlewareFn<ContextTelegraf> = async (ctx, next) => {
  console.time(`Processing update ${ctx.update.update_id}`);
  await next();
  console.timeEnd(`Processing update ${ctx.update.update_id}`);
};
