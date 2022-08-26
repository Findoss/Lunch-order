import { ContextTelegraf } from '../../telegram/types';

export const timeLog = async (
  ctx: ContextTelegraf,
  next: () => Promise<void>
) => {
  console.time(`Processing update ${ctx.update.update_id}`);
  await next();
  console.timeEnd(`Processing update ${ctx.update.update_id}`);
};
