import './config/env';

import { bot } from './services/telegram';

import { isAdmin, isParams, isCommand } from './middlewares';

import { menu } from './controllers/menu';
import { users } from './controllers/user';
import { help } from './controllers/help';
import { hello } from './controllers/hello';
import { updateStore } from './controllers/update-store';
import { stats } from './controllers/stats';
import { addAdmin, removeAdmin, listAdmin } from './controllers/admin';
import { setPollTime, startPoll, answerPoll } from './controllers/poll';
import { errorBoundary } from './controllers/error';

import './models/admin';

// info
bot.on(':new_chat_members', hello);
bot.command('hello', hello);
bot.command('users', users);
bot.command('menu', menu);
bot.command(['test', 'help'], help);

// admins
bot.command('add_admin', isAdmin, isParams(['username']), addAdmin);
bot.command('remove_admin', isAdmin, isParams(['username']), removeAdmin);
bot.command('admins', isAdmin, listAdmin);
bot.command('stats', isAdmin, stats);

// poll
bot.command('set_poll_time', isAdmin, isParams(['time(seconds)']), setPollTime);
bot.command('start', isAdmin, startPoll);
bot.on('message:photo', isAdmin, isCommand('start'), startPoll);
bot.on('poll_answer', answerPoll);

// update config bot
bot.on('message:document', isAdmin, isParams(['part_state']), updateStore);

bot.catch(errorBoundary);

bot.start();
