import { storeSetPollTimeLimit } from '../models/poll';

import type { ContextTelegraf } from '../telegram/types';

export const setPollTime = (ctx: ContextTelegraf) => {
  const [time] = ctx.commadnParams;

  storeSetPollTimeLimit(Number(time));

  ctx.replyWithMarkdown(`Время опроса установлено на ${time} секунд`);
};

export const startPoll = (ctx: ContextTelegraf) => {};
