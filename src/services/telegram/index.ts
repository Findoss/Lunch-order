import { Telegraf } from 'telegraf';
import { TG_TOKEN_BOT } from '../../config';

import type { ContextTelegraf } from './types';

export const bot = new Telegraf<ContextTelegraf>(TG_TOKEN_BOT);
