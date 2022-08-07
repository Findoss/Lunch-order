export type IdPoll = string | null;
export type IdMenu = number;
export type UserName = string;

export type Answer = { name: string; username: string; options: string[] };

export type Order = {
  idPoll: IdPoll;
  idMenu: IdMenu;
  users: Answer[];
  date: number; // Date timestamp
};

export type User = {
  name: string;
  tel: string;
  bank: string;
};

export type Food = 'salad' | 'sup' | 'dish';

export type Foods = Record<Food, string>;

export type Combo<T> = {
  combo: (keyof T)[];
  price: number;
};

export type Cafe = {
  food: Foods;
  menu: Combo<Foods>[];
  optimization: never[];
};

export type StoreState = {
  config: {
    pollTimeLimit: number; // second
    // adminUsernames: UserName[];
    saveFields: string[];
  };
  poll: {
    idPoll: IdPoll;
    idMenu: IdMenu;
    answers: Answer[];
  };
  orders: Order[];
  users: User[];
  cafe: Cafe;
};

export type StoreMethods = {
  setCafe: (cafe: Cafe) => void;
  getCafeMenu: () => Cafe;
  setUsers: (users: User[]) => void;
  getAllUsers: () => User[];
  setPollTime: (time: number) => void;
  // hasAdmin: (userName: UserName) => boolean;
  // addAdmin: (userName: UserName) => void;
  // removeAdmin: (userName: UserName) => void;
  // getAdminList: () => string;
  isProcessPoll: () => boolean;
  setPoll: (idPoll: IdPoll, idMenu: IdMenu) => void;
  getPoll: () => IdPoll;
  addAnswer: (payload: Answer) => void;
  removeAnswer: (username: UserName) => void;
  saveOrder: () => void;
  clearOrder: () => void;
  getLastOrder: () => void;
  getAllOrders: () => Order[];
  load: () => void;
  save: () => void;
};

export type Store = StoreState & StoreMethods;
