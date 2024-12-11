import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  addEntity,
  removeEntity,
  setEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { Friend } from '../types';
import { computed } from '@angular/core';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
type FilterOptions = 'all' | 'oweYou' | 'youOwe';
type FriendsState = {
  selectedFriend: string | undefined;
  savedName: string;
  filter: FilterOptions;
};
export const FriendsStore = signalStore(
  withDevtools('friends'),
  withState<FriendsState>({
    selectedFriend: undefined,
    savedName: '',
    filter: 'all',
  }),
  withEntities<Friend>(),
  withComputed((store) => {
    // this spot coming soon.
    return {
      friendList: computed(() => {
        switch (store.filter()) {
          case 'all':
            return store.entities();
          case 'oweYou':
            return store.entities().filter((f) => f.boughtLastTime === false);
          case 'youOwe':
            return store.entities().filter((f) => f.boughtLastTime === true);
        }
      }),
      stats: computed(() => {
        const total = store.entities().length;
        const owesYou = store
          .entities()
          .filter((f) => f.boughtLastTime === false).length;
        const youOwe = total - owesYou;
        return { total, owe: owesYou, youOwe };
      }),
      numberOfFriends: computed(() => store.entities().length),
      selectedFriendInfo: computed(() => {
        const id = store.selectedFriend() || '';

        return store.entityMap()[id];
      }),
    };
  }),
  withMethods((store) => {
    return {
      setFilter: (by: FilterOptions) => patchState(store, { filter: by }),
      boughtForSelectedUser: () => {
        const id = store.selectedFriend();
        if (id !== undefined) {
          patchState(
            store,
            updateEntity({ id, changes: { boughtLastTime: false } }),
          );
        }
      },
      selectedUserJustBoughtForMe: () => {
        const id = store.selectedFriend();
        if (id !== undefined) {
          patchState(
            store,
            updateEntity({ id, changes: { boughtLastTime: true } }),
          );
        }
      },
      setSavedName: (name: string) => patchState(store, { savedName: name }),
      setSelectedFriend: (friend: string) =>
        patchState(store, { selectedFriend: friend }),
      addFriend: (name: string) => {
        const friendToAdd: Friend = {
          name,
          id: crypto.randomUUID(),
          boughtLastTime: false,
        };
        patchState(store, addEntity(friendToAdd), { savedName: '' });
      },
      unFriend: () => {
        if (store.selectedFriend() !== undefined) {
          const id = store.selectedFriend() || '';
          patchState(store, removeEntity(id));
        }
      },
    };
  }),
  withHooks({
    onInit(store) {
      const fakeFriends: Friend[] = [
        { id: '1', name: 'Byron', boughtLastTime: true },
        { id: '2', name: 'Jamie', boughtLastTime: false },
        { id: '3', name: 'Michelle', boughtLastTime: true },
      ];
      patchState(store, setEntities(fakeFriends));

      const savedTempName = localStorage.getItem('tempname');
      if (savedTempName !== null) {
        patchState(store, { savedName: savedTempName });
      }
      watchState(store, (state) => {
        localStorage.setItem('tempname', state.savedName);
      });
    },
  }),
);
