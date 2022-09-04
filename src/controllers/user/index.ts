import { storeSetUsers } from '../../models/user';
import { selectAllUsers } from '../../models/user';
import { textUserContacts } from './text-user-contact';

export const setUserList = async (ctx: any) => {
  const fileMeta = await ctx.telegram.getFileLink(ctx.message.document.file_id);
  const response = await fetch(fileMeta.href);
  const data = await response.json();

  storeSetUsers(data);
  ctx.replyWithMarkdown(`Список с пользователями обновлен`);
};

export const users = (ctx: any) => {
  const text = `Участники \n\n${textUserContacts(selectAllUsers())}\n`;

  ctx.replyWithMarkdown(text);
};
