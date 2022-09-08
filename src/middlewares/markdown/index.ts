import type { ContextTelegraf } from '../../services/telegram/types';

import { MiddlewareFn } from './types';
import { escape } from '../../utils/escape';

export const middlewareMarkdown: MiddlewareFn<ContextTelegraf> = async (
  ctx,
  next
) => {
  ctx.replyWithMarkdown = (...args: any[]) => {
    const [text, payload, ...rest] = args;
    return ctx.reply(
      escape(text),
      { ...payload, parse_mode: 'MarkdownV2' },
      ...rest
    );
  };
  await next();
};
