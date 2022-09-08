import type { Context as ContextGrammy } from 'grammy';
import type { FileFlavor } from '@grammyjs/files';
import type { Message } from 'grammy/out/types.node';

type ContextGrammyFiles = FileFlavor<ContextGrammy>;
export type ContextTelegraf = ContextGrammyFiles & {
  replyWithMarkdown: (...args: any[]) => Promise<Message.TextMessage>;
  commadnParams: string[];
};
