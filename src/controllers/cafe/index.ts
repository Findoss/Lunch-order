import type { ContextTelegraf } from '../../services/telegram/types';
import { storeSetCafe } from '../../models/cafe';

export const setCafe = async (ctx: ContextTelegraf) => {
  const file = await ctx.getFile();
  const url = await file.getUrl();
  const response = await fetch(url);
  const data = await response.json();

  storeSetCafe(data);
  ctx.replyWithMarkdown(`Меню обновлено`);
};
