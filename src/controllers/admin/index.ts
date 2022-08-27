import { ADMIN_USERNAME } from '../../config';

import {
  storeAddAdmin,
  selectHasAdmin,
  storeRemoveAdmin,
  selectAdminList,
} from '../../models/admin';

import type { ContextTelegraf } from '../../services/telegram/types';

export const addAdmin = (ctx: ContextTelegraf) => {
  const [rawUserName] = ctx.commadnParams;
  const userName = rawUserName.replace('@', '');

  if (selectHasAdmin(userName)) {
    ctx.replyWithMarkdown(`@${userName} уже в списке админов`);
    return;
  }

  storeAddAdmin(userName);
  ctx.replyWithMarkdown(`Теперь @${userName} в списке админов, повинуюсь`);
};

export const removeAdmin = (ctx: ContextTelegraf) => {
  const [rawUserName] = ctx.commadnParams;
  const userName = rawUserName.replace('@', '');

  if (userName === ADMIN_USERNAME) {
    ctx.replyWithMarkdown(
      `@${userName} тебя хотели удалить! но я этого никогда не сделаю!`
    );
    return;
  }

  if (!selectHasAdmin(userName)) {
    ctx.replyWithMarkdown(`@${userName} нет в списке админов`);
    return;
  }

  storeRemoveAdmin(userName);

  ctx.replyWithMarkdown(`@${userName} удален из админов`);
};

export const listAdmin = (ctx: ContextTelegraf) => {
  ctx.replyWithMarkdown(
    `Кто может управлять ботом\nСоздатель @${ADMIN_USERNAME} \nAдмины: ${
      selectAdminList() || 'пуст'
    }`
  );
};
