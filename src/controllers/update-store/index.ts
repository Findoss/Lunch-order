import type { ContextTelegraf } from '../../services/telegram/types';
import { setUserList } from '../user';
import { setCafe } from '../cafe';

export const updateStore = async (ctx: ContextTelegraf) => {
  const [partState] = ctx.commadnParams;

  if (partState === 'users') {
    setUserList(ctx);
  }

  if (partState === 'cafe') {
    setCafe(ctx);
  }
};
