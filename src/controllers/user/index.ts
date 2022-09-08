import type { ContextTelegraf } from '../../services/telegram/types';

import { storeSetUsers } from '../../models/user';
import { selectAllUsers } from '../../models/user';
import { textUserContacts } from './text-user-contact';

export const setUserList = async (ctx: ContextTelegraf) => {
  const file = await ctx.getFile();
  const url = await file.getUrl();
  const response = await fetch(url);
  const data = await response.json();

  storeSetUsers(data);
  ctx.replyWithMarkdown(`Список с пользователями обновлен`);
};

export const users = (ctx: ContextTelegraf) => {
  const text = `Участники \n\n${textUserContacts(selectAllUsers())}\n`;

  ctx.replyWithMarkdown(text);
};
