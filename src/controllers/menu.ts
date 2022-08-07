import { selectCafe } from '../models/cafe';
import { textMenu } from '../format/text-menu';

import type { ContextTelegraf } from '../telegram/types';

export const menu = (ctx: ContextTelegraf) => {
  const menuData = textMenu(selectCafe());

  ctx.replyWithMarkdown(`Mеню\n\n${menuData}`);
};
