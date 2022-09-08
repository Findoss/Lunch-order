import type { ContextTelegraf } from './types';

import { IS_DEV } from '../../config';
import { timeLog } from '../../middlewares';

import { Bot } from 'grammy';
import { hydrateFiles } from '@grammyjs/files';
import { TG_TOKEN_BOT } from '../../config';
import { middlewareMarkdown } from '../../middlewares/markdown';

export const bot = new Bot<ContextTelegraf>(TG_TOKEN_BOT);

if (IS_DEV) {
  bot.use(timeLog);
}

bot.use(middlewareMarkdown);
bot.api.config.use(hydrateFiles(bot.token));
