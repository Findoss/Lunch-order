import { load, save } from './db';

import type { StorageAdapter } from './types';

export const adapter: StorageAdapter = (key) => ({
  get: async () => load(key),
  set: async (value) => save(key, value),
});
