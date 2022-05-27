import { ADMIN_USERNAME } from "./config.js";
import JSONdb from "simple-json-db";
const db = new JSONdb("./db.json", {
  asyncWrite: true,
});

export const store = {
  config: {
    pollTimeLimit: 300,
    adminUsernames: [ADMIN_USERNAME],
    saveFields: ["config", "orders"],
  },
  poll: {
    idPoll: null,
    idMenu: 0,
    pollAnswers: [],
  },
  orders: [],

  setPollTime(time) {
    if (time >= 5 && time <= 300) {
      this.config.pollTimeLimit = time;
    }
  },

  hasAdmin(id) {
    return this.config.adminUsernames.includes(id);
  },

  addAdmin(id) {
    if (!this.hasAdmin(id)) {
      this.config.adminUsernames.push(id);
    }
  },

  removeAdmin(id) {
    if (id !== ADMIN_USERNAME) {
      this.config.adminUsernames = this.config.adminUsernames.filter(
        (adminId) => adminId !== id
      );
    }
  },

  isProcessPoll() {
    return this.poll.idPoll !== null;
  },

  setPoll(idPoll, idMenu) {
    this.poll.idMenu = idMenu;
    this.poll.idPoll = idPoll;
  },

  getPoll() {
    return this.poll.idPoll;
  },

  addAnswer(payload) {
    this.poll.pollAnswers.push(payload);
  },

  removeAnswer(username) {
    this.poll.pollAnswers = this.poll.pollAnswers.filter(
      (answer) => answer.username !== username
    );
  },

  saveOrder() {
    this.orders.push({
      idPoll: this.poll.idPoll,
      idMenu: this.poll.idMenu,
      users: this.poll.pollAnswers,
      date: Date.now(),
    });

    this.clearOrder();
  },

  clearOrder() {
    this.poll.idPoll = null;
    this.poll.idMenu = 0;
    this.poll.pollAnswers = [];
  },

  getLastOrder() {
    return this.orders.at(-1);
  },

  load() {
    if (this.config.saveFields.length > 0) {
      this.config.saveFields.map((key) => {
        if (db.has(key)) {
          this[key] = JSON.parse(db.get(key));
        }
      });
    }
  },

  save() {
    if (this.config.saveFields.length > 0) {
      this.config.saveFields.map((key) => {
        db.set(key, JSON.stringify(this[key]));
      });
    }
  },
};
