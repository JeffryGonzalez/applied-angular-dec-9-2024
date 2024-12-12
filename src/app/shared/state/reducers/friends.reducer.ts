import { createReducer, on } from '@ngrx/store';
import { FriendActions } from './actions';

export type FriendsState = {
  count: number;
};

const initialState: FriendsState = { count: 0 };

export const reducer = createReducer(
  initialState,
  on(FriendActions.friendCountChanged, (s, a) => ({ ...s, count: a.count })),
);
