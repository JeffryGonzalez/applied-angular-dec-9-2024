import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromFriends from './reducers/friends.reducer';
export type AppState = {
  friends: fromFriends.FriendsState;
};

export const reducers: ActionReducerMap<AppState> = {
  friends: fromFriends.reducer,
};
const selectFriendsFeature = (state: AppState) => state.friends;
export const selectFriendCount = createSelector(
  selectFriendsFeature,
  (f) => f.count,
);

export const selectHasFriends = createSelector(selectFriendCount, (f) => f > 0);

export const selectMealActivity = createSelector(
  selectFriendsFeature,
  (f) => f.activity,
);
