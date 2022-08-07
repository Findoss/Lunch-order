import { selectAllUsers } from '../models/user';
import { textUserContacts } from '../format/text-user-contacts';

export const hello = (ctx: any) => {
  let name = 'Михаил';

  if (ctx.message.new_chat_members) {
    name = ctx.message.new_chat_members[0].first_name;
  }

  const textHello = `Привет ***${name}***!\n`;
  const textRules =
    'В этом чате мы объединяемся покушать.\n' +
    'Вместе заказать доставку или сходить в кафе/ресторан' +
    ' \n\n' +
    'Обычно \n' +
    '- Обед в ~13:00 \n' +
    '- Чай в ~17:00 \n' +
    'Главное правило на кухне - ни слова о работе! \n' +
    '\n';
  const textUsers = `${textUserContacts(selectAllUsers())}\n`;
  const text = `${textHello}${textRules}${textUsers}`;

  ctx.replyWithMarkdown(text);
};
