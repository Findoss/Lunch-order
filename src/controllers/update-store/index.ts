import { setUserList } from '../user/user';
import { setCafe } from '../cafe';

export const updateStore = (ctx: any) => {
  const [partState] = ctx.commadnParams;

  if (partState === 'users') {
    setUserList(ctx);
  }

  if (partState === 'cafe') {
    setCafe(ctx);
  }
};
