import { createActionGroup, props } from '@ngrx/store';

export const FriendActions = createActionGroup({
  source: 'Friends',
  events: {
    friendCountChanged: props<{ count: number }>(),
  },
});
