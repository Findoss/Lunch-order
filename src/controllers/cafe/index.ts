import { storeSetCafe } from '../../models/cafe';

export const setCafe = async (ctx: any) => {
  const fileMeta = await ctx.telegram.getFileLink(ctx.message.document.file_id);
  const response = await fetch(fileMeta.href);
  const data = await response.json();

  storeSetCafe(data);
  ctx.replyWithMarkdown(`Меню обновлено`);
};
