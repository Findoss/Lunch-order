import type { MiddlewareFn } from 'grammy';
import type { ContextTelegraf } from '../../services/telegram/types';

import { ADMIN_USERNAME } from '../../config';
import { selectHasAdmin, selectAdminList } from '../../models/admin';

export const isAdmin: MiddlewareFn<ContextTelegraf> = async (ctx, next) => {
  const userName = ctx.message?.from?.username ?? '';

  if (!selectHasAdmin(userName) && userName !== ADMIN_USERNAME) {
    ctx.replyWithMarkdown(
      `Не суетись, я слушаюсь только создателя @${ADMIN_USERNAME} и админов ${selectAdminList()}`
    );
    return;
  } else {
    await next();
  }
};
