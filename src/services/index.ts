import { persist } from 'effector-storage';
import { adapter } from './fs-adapter';

export const persistState = (store: any) => persist({ store, adapter });
