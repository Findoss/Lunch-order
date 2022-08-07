import { createStore, createEvent } from 'effector';
import { persistState } from '../../services';
import { UserName } from '../types';

import type { Answer } from './types';

// events
export const storeSetPollTimeLimit = createEvent<number>('setTimeLimit');
export const storeStartPoll = createEvent<number>('setId');
export const storeStopPoll = createEvent('reset');
export const storeAddAnswer = createEvent<Answer>('add');
export const storeRemoveAnswer = createEvent<UserName>('remove');

// store
export const pollTimeLimit = createStore<number>(300, {
  name: 'pollTimeLimit',
}).on(storeSetPollTimeLimit, (state, seconds: number) => seconds);

export const poll = createStore<number | null>(null, { name: 'poll' })
  .on(storeStartPoll, (state, id) => id)
  .reset(storeStopPoll);

export const pollAnswers = createStore<Answer[]>([], { name: 'pollAnswers' })
  .on(storeAddAnswer, (state, answer) => [...state, answer])
  .on(storeRemoveAnswer, (state, username) =>
    state.filter((v) => v.username !== username)
  )
  .reset(storeStopPoll);

// selectors
export const selectPollTimeLimit = () => pollTimeLimit.getState();
export const selectIdPoll = () => poll.getState();
export const selectIsPollProcess = () => poll.getState() !== null;
export const selectPoll = () => pollAnswers.getState();

// save
persistState(pollTimeLimit);

// watch
pollAnswers.watch(console.log);
