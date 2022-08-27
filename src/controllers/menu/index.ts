import type { ContextTelegraf } from '../../services/telegram/types';

import { selectCafe } from '../../models/cafe';
import { textMenu } from '../order/text';

export const menu = (ctx: ContextTelegraf) => {
  const menuData = textMenu(selectCafe());

  ctx.replyWithMarkdown(`Mеню\n\n${menuData}`);
};
