import { storeArhiveOrder } from '../models/order';
import { selectCafe, selectFoodKeys, selectFoodValue } from '../models/cafe';
import {
  storeSetPollTimeLimit,
  selectIdPoll,
  selectPollTimeLimit,
  storeStartPoll,
  storeStopPoll,
  selectIsPollProcess,
  storeRemoveAnswer,
  storeAddAnswer,
  selectPoll,
} from '../models/poll';
import { textOrder } from '../format/text-order';

import type { ContextTelegraf } from '../telegram/types';

export const setPollTime = (ctx: ContextTelegraf) => {
  const [time] = ctx.commadnParams;
  const seconds = Number(time);

  const MIN = 10;
  const MAX = 600;

  if (seconds < MIN || seconds > MAX) {
    ctx.replyWithMarkdown(
      `Время опроса ддолжно быть не меньше ${MIN} секнд и не больше ${MAX}`
    );
    return;
  }

  storeSetPollTimeLimit(seconds);

  ctx.replyWithMarkdown(`Время опроса установлено на ${seconds} секунд`);
};

export const startPoll = (ctx: ContextTelegraf) => {
  if (selectIsPollProcess()) {
    ctx.replyWithMarkdown(
      `Нельзя запускать больше 1 опроса.\n` +
        `Сейчас идет id***${selectIdPoll()}***`
    );
    return;
  }

  ctx
    .replyWithPoll('Заказываем обед', selectFoodValue(), {
      is_anonymous: false,
      open_period: selectPollTimeLimit(),
      allows_multiple_answers: true,
    })
    .then((requestPoll) => {
      const idPoll = Number(requestPoll.poll.id);
      storeStartPoll(idPoll);
      return idPoll;
    })
    .then((idPoll) => {
      const TIME_WAIT = (selectPollTimeLimit() + 1) * 1000;

      setTimeout(() => {
        const logOrder = {
          idPoll: idPoll,
          users: selectPoll(),
          date: Date.now(),
        };
        const cafe = selectCafe();

        storeArhiveOrder(logOrder);
        storeStopPoll();

        if (logOrder.users.length === 0) {
          ctx.reply('Заказов нет');
          return;
        }

        const order = logOrder;
        ctx.replyWithMarkdown(textOrder(cafe, order));
      }, TIME_WAIT);
    });
};

export const answerPoll = (ctx: any) => {
  const { option_ids, user } = ctx.pollAnswer;
  const { username, first_name, last_name } = user;

  if (option_ids.length > 0) {
    storeAddAnswer({
      name: `${first_name} ${last_name ?? ''}`,
      username: username,
      options: option_ids.map((i: number) => selectFoodKeys()[i]),
    });
  } else {
    storeRemoveAnswer(username);
  }
};
