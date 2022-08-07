// import { ADMIN_USERNAME } from '../config';
import { db } from '../models/fs-adapter/db';

import type { Store, StoreState } from './types';

export const store: Store = {
  config: {
    pollTimeLimit: 300,
    // adminUsernames: [ADMIN_USERNAME],
    saveFields: ['config', 'orders', 'users', 'cafe'],
  },
  orders: [],
  users: [
    {
      name: 'Оксана Кузьменко',
      tel: '+7(999)209-15-29',
      bank: 'Тинькофф/Райффайзен',
    },
    {
      name: 'Максим Крупяев',
      tel: '+7(921)311-33-94',
      bank: 'Тинькофф/Райффайзен',
    },
    {
      name: 'Тамара Колпакова',
      tel: '+7(913)372-47-80',
      bank: 'Тинькофф/Альфа',
    },
    {
      name: 'Катя Красавцева',
      tel: '+7(963)342-91-82',
      bank: 'Райффайзен/Сбербанк',
    },
    { name: 'Сергей Гузиков', tel: '+7(906)242-20-00', bank: 'Альфа' },
    { name: 'Кирилл Дроздов', tel: '+7(981)156-91-37', bank: 'Тинькофф' },
    { name: 'Никита Строганов', tel: '+7(911)012-19-49', bank: 'Альфа' },
  ],
  cafe: {
    food: {
      salad: 'Салат',
      sup: 'Суп',
      dish: 'Горячее',
    },
    menu: [
      {
        combo: ['salad'],
        price: 130,
      },
      {
        combo: ['sup'],
        price: 130,
      },
      {
        combo: ['dish'],
        price: 200,
      },
      {
        combo: ['salad', 'sup'],
        price: 250,
      },
      {
        combo: ['salad', 'dish'],
        price: 280,
      },
      {
        combo: ['sup', 'dish'],
        price: 280,
      },
      {
        combo: ['salad', 'sup', 'dish'],
        price: 350,
      },
    ],
    optimization: [],
  },
  poll: {
    idPoll: null,
    idMenu: 0,
    answers: [],
  },

  //
  getCafeMenu() {
    return this.cafe;
  },

  setCafe(cafe) {
    this.cafe = cafe;
  },

  // учтановить список пользователей
  setUsers(users) {
    this.users = users;
  },

  // учтановить список пользователей
  getAllUsers() {
    return this.users;
  },

  // установить время таймера опроса
  setPollTime(time) {
    if (time >= 5 && time <= 300) {
      this.config.pollTimeLimit = time;
    }
  },

  // управление администраторами бота

  // // проверить юзера на админа
  // hasAdmin(userName) {
  //   return this.config.adminUsernames.includes(userName);
  // },

  // // добавить юзера в админы
  // addAdmin(userName) {
  //   if (!this.hasAdmin(userName)) {
  //     this.config.adminUsernames.push(userName);
  //   }
  // },

  // удалить юзера в админы
  // removeAdmin(userName) {
  //   if (userName !== ADMIN_USERNAME) {
  //     this.config.adminUsernames = this.config.adminUsernames.filter(
  //       (adminId) => adminId !== userName
  //     );
  //     return true;
  //   }
  //   return false;
  // },

  // getAdminList() {
  //   return this.config.adminUsernames.map((userName) => `@${userName}`).join();
  // },

  // управление состоянием опроса

  // получить состояние опроса
  isProcessPoll() {
    return this.poll.idPoll !== null;
  },

  // запустить опрос
  setPoll(idPoll, idMenu) {
    this.poll.idPoll = idPoll;
    this.poll.idMenu = idMenu;
  },

  // получить данные опроса
  getPoll() {
    return this.poll.idPoll;
  },

  // управление ответами на опрос

  // добавление ответа в пул ответов
  addAnswer(payload) {
    this.poll.answers.push(payload);
  },

  // удаление ответа из пула ответов
  removeAnswer(username: string) {
    this.poll.answers = this.poll.answers.filter(
      (answer) => answer.username !== username
    );
  },

  // сохранить заказ в пул заказов
  saveOrder() {
    this.orders.push({
      idPoll: this.poll.idPoll,
      idMenu: this.poll.idMenu,
      users: this.poll.answers,
      date: Date.now(),
    });

    this.clearOrder();
  },

  // очистить опрос
  clearOrder() {
    this.poll.idPoll = null;
    this.poll.idMenu = 0;
    this.poll.answers = [];
  },

  // показать последный пул заказов
  getLastOrder() {
    return this.orders.at(-1);
  },

  // показать последный пул заказов
  getAllOrders() {
    return this.orders;
  },

  // загрузить с диска
  load() {
    if (this.config.saveFields.length > 0) {
      this.config.saveFields.map((key) => {
        if (db.has(key)) {
          this[key as keyof StoreState] = JSON.parse(db.get(key));
        }
      });
    }
  },

  // сохранить на диск
  save() {
    if (this.config.saveFields.length > 0) {
      this.config.saveFields.map((key) => {
        db.set(key, JSON.stringify(this[key as keyof StoreState]));
      });
    }
  },
};
