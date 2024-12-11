import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import {
  withClientFriendData,
  withFriendsFilter,
  withSavedFormData,
  withSelectedFriend,
  withServerFriendData,
} from './features';
import { addEntity, removeEntity } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, mergeMap, tap, map, switchMap } from 'rxjs';
import { FriendsDataService } from './friends-data.service';
import { FriendModel } from '../types';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
type CreateType = {
  name: string;
  tempId: string;
};
export const FriendsStore = signalStore(
  withDevtools('friends'),
  withFriendsFilter(),
  withSelectedFriend(),
  withSavedFormData(),
  withServerFriendData(),
  withClientFriendData(),

  withComputed((store) => {
    // this spot coming soon.
    return {
      friendList: computed(() => {
        const friends = [
          ...store
            .serverEntities()
            .map((f) => ({ ...f, isPending: false }) as FriendModel),
          ...store
            .clientEntities()
            .map((f) => ({ ...f, isPending: true }) as FriendModel),
        ];
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
    const service = inject(FriendsDataService);
    return {
      addFriend: rxMethod<string>(
        pipe(
          map((name) => {
            return {
              name,
              tempId: crypto.randomUUID(),
            } as CreateType;
          }),
          tap((d) => store._addTempFriend(d.name, d.tempId)),
          mergeMap(
            (
              d, // mergeMap should be used with unsafe HTTP operations (POST, PUT, DELETE)
            ) =>
              service
                .addFriend(d.name, d.tempId)
                .pipe(
                  tap((f) =>
                    patchState(
                      store,
                      addEntity(f.r, { collection: 'server' }),
                      removeEntity(f.tempId, { collection: 'client' }),
                    ),
                  ),
                ),
          ),
        ),
      ),
      // addFriend: (name: string) => {
      //   const tempId = crypto.randomUUID();
      //   store._addTempFriend(name, tempId);
      //   store._addServerFriend({ name, tempId }); /// resolve WAY later.
      // },
      loadAgain: () => {
        store._loadServerData();
      },
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

      unFriend: () => {
        // if (store.selectedFriend() !== undefined) {
        //   const id = store.selectedFriend() || '';
        //   patchState(store, removeEntity(id));
        // }
      },
    };
  }),
  withHooks({
    onInit(store) {
      store._loadServerData();
    },
  }),
);
