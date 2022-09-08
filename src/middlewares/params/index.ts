import type { ContextTelegraf } from '../../services/telegram/types';

export const isParams =
  (paramsRequire: string[] = []) =>
  async (ctx: ContextTelegraf, next: () => Promise<void>) => {
    const raw = ctx.message?.text ?? ctx.message?.caption ?? '';
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
