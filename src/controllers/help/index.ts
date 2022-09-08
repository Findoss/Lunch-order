import type { ContextTelegraf } from '../../services/telegram/types';

export const help = (ctx: ContextTelegraf) => {
  const text =
    'Справочник' +
    '\n\n' +
    '/menu - выводит меню\n' +
    '/help - выводит подсказку по командам\n' +
    '/admins - выводит список админов\n' +
    '/users - выводит список участников\n' +
    '/start /poll - запускает опрос\n' +
    '/set_poll_time - устанавливает время для опроса в секундах (от 10 до 600 сек)\n' +
    '/stats - статистика экономии за последний месяц\n' +
    '\n\n' +
    'Создатель @findoss';

  ctx.replyWithMarkdown(text);
};
