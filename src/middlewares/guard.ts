import { ADMIN_USERNAME } from '../config';
import { selectHasAdmin, selectAdminList } from '../models/admin';

import type { ContextTelegraf } from '../telegram/types';

export const isAdmin = async (
  ctx: ContextTelegraf,
  next: () => Promise<void>
) => {
  const userName = ctx.message.from.username ?? '';

  if (!selectHasAdmin(userName) && userName !== ADMIN_USERNAME) {
    ctx.reply(
      `Не суетись, я слушаюсь только создателя @${ADMIN_USERNAME} и админов ${selectAdminList()}`
    );
    return;
  } else {
    await next();
  }
};

export const isParams =
  (paramsRequire: string[] = []) =>
  async (ctx: ContextTelegraf, next: () => Promise<void>) => {
    const raw = ctx.message.text ?? ctx.message.caption ?? '';
    const params = raw.replace('/', '').split(' ');
    params.shift(); // cmd

    if (params.length >= paramsRequire.length) {
      ctx.commadnParams = params;
      await next();
    } else {
      ctx.replyWithMarkdown(
        `Обязательные параметры - \`${paramsRequire.join(`\`, \``)}\``
      );
    }
  };
