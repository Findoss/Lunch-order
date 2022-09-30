import type { ContextTelegraf } from '../../services/telegram/types';

export const isCommand =
  (commandRequire = '') =>
  async (ctx: ContextTelegraf, next: () => Promise<void>) => {
    const raw = ctx.message?.text ?? ctx.message?.caption ?? '';
    const command = raw.replace('/', '').split(' ').shift();

    if (command === commandRequire) {
      await next();
    } else {
      return;
    }
  };
