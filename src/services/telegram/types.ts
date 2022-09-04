import { Context } from 'telegraf';

type CustomMessage = { text?: string; caption?: string };

export interface ContextTelegraf extends Context {
  message: Context['message'] & CustomMessage;
  commadnParams: string[];
}
