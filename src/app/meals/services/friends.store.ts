import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed } from '@angular/core';
import {
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import {
  withClienttFriendData,
  withFriendsFilter,
  withSavedFormData,
  withSelectedFriend,
  withServerFriendData,
} from './features';

export const FriendsStore = signalStore(
  withDevtools('friends'),
  withFriendsFilter(),
  withSelectedFriend(),
  withSavedFormData(),
  withServerFriendData(),
  withClienttFriendData(),
  withComputed((store) => {
    // this spot coming soon.
    return {
      friendList: computed(() => {
        const friends = store.serverEntities();
        switch (store.filter()) {
          case 'all':
            return friends;
          case 'oweYou':
            return friends.filter((f) => f.boughtLastTime === false);
          case 'youOwe':
            return friends.filter((f) => f.boughtLastTime === true);
        }
      }),
      stats: computed(() => {
        const friends = store.serverEntities();
        const total = friends.length;
        const owesYou = friends.filter(
          (f) => f.boughtLastTime === false,
        ).length;
        const youOwe = total - owesYou;
        return { total, owe: owesYou, youOwe };
      }),
      numberOfFriends: computed(() => {
        const friends = store.serverEntities();
        return friends.length;
      }),
      selectedFriendInfo: computed(() => {
        const id = store.selectedFriend() || '';
        const friends = store.serverEntityMap();

        return friends[id];
      }),
    };
  }),
  withMethods((store) => {
    return {
      boughtForSelectedUser: () => {
        // const id = store.selectedFriend();
        // if (id !== null) {
        //   patchState(
        //     store,
        //     updateEntity({ id, changes: { boughtLastTime: false } }),
        //   );
        // }
      },
      selectedUserJustBoughtForMe: () => {
        // const id = store.selectedFriend();
        // if (id !== null) {
        //   patchState(
        //     store,
        //     updateEntity({ id, changes: { boughtLastTime: true } }),
        //   );
        // }
      },

      addFriend: (name: string) => {
        // const friendToAdd: Friend = {
        //   name,
        //   id: crypto.randomUUID(),
        //   boughtLastTime: false,
        // };
        // patchState(store, addEntity(friendToAdd), {
        //   savedName: '',
        // });
      },
      unFriend: () => {
        // if (store.selectedFriend() !== undefined) {
        //   const id = store.selectedFriend() || '';
        //   patchState(store, removeEntity(id));
        // }
      },
    };
  }),
  withHooks({}),
);
