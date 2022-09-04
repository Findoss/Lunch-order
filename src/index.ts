import './config/env';

import { bot } from './services/telegram';

import { isAdmin, timeLog, isParams } from './middlewares';

import { menu } from './controllers/menu';
import { users } from './controllers/user';
import { help } from './controllers/help';
import { hello } from './controllers/hello';
import { updateStore } from './controllers/update-store';
import { addAdmin, removeAdmin, listAdmin } from './controllers/admin';
import { setPollTime, startPoll, answerPoll } from './controllers/poll';

import './models/admin';

// middlewares
bot.use(timeLog);

// test
bot.command('test', help);

// info
bot.on('new_chat_members', hello);
bot.command('hello', hello);
bot.command('users', users);
bot.command('menu', menu);
bot.command('help', help);

// admins
bot.command('add_admin', isAdmin, isParams(['username']), addAdmin);
bot.command('remove_admin', isAdmin, isParams(['username']), removeAdmin);
bot.command('admins', isAdmin, listAdmin);

// poll
bot.command('set_poll_time', isAdmin, isParams(['time(seconds)']), setPollTime);
bot.command('start', isAdmin, startPoll);
bot.on('poll_answer', answerPoll); // todo fix types

// update config bot
bot.on('document', isAdmin, isParams(['part_state']), updateStore); // todo fix types

bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
