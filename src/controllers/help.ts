import type { ContextTelegraf } from '../telegram/types';

export const help = (ctx: ContextTelegraf) => {
  const text =
    'Справочник' +
    '\n\n' +
    '/help - справка \n' +
    '/menu - меню с ценами' +
    '\n\n' +
    'Создатель @findoss';

  ctx.replyWithMarkdown(text);
};
