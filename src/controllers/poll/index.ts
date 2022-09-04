import type { ContextTelegraf } from '../../services/telegram/types';

import { REPORT_ID_CHENAL } from '../../config';

import { createOrder } from '../../services/optimization';
import {
  textOrder,
  textReportOrder,
  textOrderOptimization,
} from '../../services/optimization/text';

import { selectCafe, selectFoodKeys, selectFoodValue } from '../../models/cafe';
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
} from '../../models/poll';
import { storeArhiveOrder } from '../../models/order';

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
        const cafe = selectCafe();
        const poll = selectPoll();

        // закрываем опрос
        storeStopPoll();

        if (poll.length === 0) {
          ctx.reply('Заказов нет');
          return;
        }

        // формируем заказ из опроса
        const { originalOrder, optimizitionOrder } = createOrder(cafe, poll);

        // логируем
        storeArhiveOrder({
          idPoll: idPoll,
          order: optimizitionOrder,
          date: Date.now(),
        });

        // отправляем отчет оптимизации
        // ctx.telegram.sendMessage(
        //   REPORT_ID_CHENAL,
        //   textReportOrder(optimizitionOrder, cafe)
        // );

        // отправляем результат
        ctx.replyWithMarkdown(textOrderOptimization(optimizitionOrder, cafe));
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
      keys: option_ids.map((i: number) => selectFoodKeys()[i]),
    });
  } else {
    storeRemoveAnswer(username);
  }
};
