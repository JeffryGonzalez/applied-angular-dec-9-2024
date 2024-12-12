import { createActionGroup, props } from '@ngrx/store';

export const FriendActions = createActionGroup({
  source: 'Friends',
  events: {
    friendCountChanged: props<{ count: number }>(),
    boughtForFriennd: props<{ friend: string }>(),
    friendBoughtForYou: props<{ friend: string }>(),
  },
});
