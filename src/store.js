export const store = {
  poll: {
    idPoll: null,
    pollAnswers: [],
  },
  orders: [],

  isProcessPoll() {
    return this.poll.idPoll !== null;
  },

  setPoll(id) {
    this.poll.idPoll = id;
  },

  getPoll() {
    return this.poll.idPoll;
  },

  addAnswer(payload) {
    this.poll.pollAnswers.push(payload);
  },

  saveOrder() {
    this.orders.push({
      id: this.poll.idPoll,
      users: this.poll.pollAnswers,
    });

    this.clear();
  },

  clear() {
    this.poll.idPoll = null;
    this.poll.pollAnswers = [];
  },

  getLastOrder() {
    return this.orders.at(-1);
  },
};
