import './config/env';

import { bot } from './telegram';
// import { store } from './store';

import { isAdmin, timeLog, isParams } from './middlewares';

import { menu } from './controllers/menu';
import { help } from './controllers/help';
import { hello } from './controllers/hello';
import { setPollTime } from './controllers/poll';
import { updateStore } from './controllers/update-store';
import { addAdmin, removeAdmin, listAdmin } from './controllers/admin';

import './models/admin';

// middlewares
bot.use(timeLog);

// test
bot.command('test', help);
bot.command('test_hello', hello);

// info
bot.on('new_chat_members', hello);
bot.command('menu', menu);
bot.command('help', help);

// admins
bot.command('add_admin', isAdmin, isParams(['username']), addAdmin);
bot.command('remove_admin', isAdmin, isParams(['username']), removeAdmin);
bot.command('list_admin', isAdmin, listAdmin);

// poll
bot.command('set_poll_time', isAdmin, isParams(['time(seconds)']), setPollTime);

// update config bot
bot.on('document', isAdmin, isParams(['part_state']), updateStore);

bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
