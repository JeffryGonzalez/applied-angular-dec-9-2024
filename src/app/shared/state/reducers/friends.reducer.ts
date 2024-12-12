import { createReducer, on } from '@ngrx/store';
import { FriendActions } from './actions';

export type FriendsState = {
  count: number;
  activity: string[];
};

const initialState: FriendsState = { count: 0, activity: [] };

export const reducer = createReducer(
  initialState,
  on(FriendActions.friendCountChanged, (s, a) => ({ ...s, count: a.count })),
  on(FriendActions.boughtForFriennd, (s, a) => ({
    ...s,
    activity: [`You bought for ${a.friend}`, ...s.activity],
  })),
  on(FriendActions.friendBoughtForYou, (s, a) => ({
    ...s,
    activity: [`${a.friend} bought for you`, ...s.activity],
  })),
);
