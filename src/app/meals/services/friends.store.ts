import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { tapResponse } from '@ngrx/operators';
import {
  addEntity,
  removeEntity,
  setEntities,
  updateEntity,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { filter, map, mergeMap, pipe, switchMap, tap } from 'rxjs';
import { FriendModel } from '../types';
import {
  withClientFriendData,
  withFriendsFilter,
  withSavedFormData,
  withSelectedFriend,
  withServerFriendData,
  withReduxStore,
  setCount,
} from './features';
import { FriendsDataService } from './friends-data.service';
import { setFulfilled, setPending } from '@shared';
import { Store } from '@ngrx/store';
import { FriendActions } from '../../shared/state/reducers/actions';
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
  withReduxStore(),

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
        const pending = store.clientIds().length;
        const owesYou = friends.filter(
          (f) => f.boughtLastTime === false,
        ).length;
        const youOwe = total - owesYou;
        return { total, owe: owesYou, youOwe, pending };
      }),
      numberOfFriends: computed(() => {
        const friends = store.serverEntities();
        return friends.length;
      }),
      selectedFriendInfo: computed(() => {
        const id = store.selectedFriend() || '';
        const serverFriends = store.serverEntityMap();
        const clientFriends = store.clientEntityMap();
        return serverFriends[id] ?? clientFriends[id];
      }),
    };
  }),
  withMethods((store) => {
    const service = inject(FriendsDataService);
    const reduxStore = inject(Store);
    return {
      _loadServerData: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending())),
          switchMap(() =>
            // if this gets called multiple times, I don't care about the previous calls.
            service
              .getFriends()
              .pipe(
                tap((r) =>
                  patchState(
                    store,
                    setEntities(r, { collection: 'server' }),
                    setFulfilled(),
                    setCount(r.length),
                  ),
                ),
              ),
          ),
        ),
      ),
      addFriend: rxMethod<string>(
        pipe(
          map((name) => {
            // a:string => b: CreateType
            return {
              name,
              tempId: crypto.randomUUID(),
            } as CreateType;
          }),
          tap((d) => store._addTempFriend(d.name, d.tempId)), // d:CreateType => d:CreateType
          mergeMap(
            (
              d, // mergeMap should be used with unsafe HTTP operations (POST, PUT, DELETE)
            ) =>
              service.addFriend(d.name, d.tempId).pipe(
                tapResponse({
                  next(response) {
                    patchState(
                      store,
                      addEntity(response.friend, { collection: 'server' }),
                      removeEntity(response.tempId, { collection: 'client' }),
                    );
                  },
                  error(err) {
                    console.error(err);
                  },
                  complete() {
                    patchState(store, setCount(store.serverIds().length));
                  },
                }),
              ),
          ),
        ),
      ),

      boughtForSelectedUser: rxMethod<void>(
        pipe(
          map(() => {
            const id = store.selectedFriend();
            return id;
          }),
          filter((id) => id !== null), // only continue if this predicate is true. (string | null) => string
          map((id) => store.serverEntityMap()[id]), // jules
          tap((friend) =>
            patchState(
              store,
              removeEntity(friend.id, { collection: 'server' }), // take them out of server state (or could duplicate...one sec.)
              addEntity(friend, { collection: 'client' }), // add it to wip
              updateEntity(
                { id: friend.id, changes: { boughtLastTime: true } },
                { collection: 'client' },
              ),
            ),
          ),
          mergeMap((friend) =>
            service.markFriendAsOwingYou(friend).pipe(
              tapResponse({
                next(value) {
                  patchState(
                    store,
                    removeEntity(friend.id, { collection: 'client' }),
                    addEntity(value, { collection: 'server' }),
                  );
                },
                error: (err) => console.log(err),
                complete() {
                  reduxStore.dispatch(
                    FriendActions.boughtForFriennd({ friend: friend.name }),
                  );
                },
              }),
            ),
          ),
        ),
      ),

      selectedUserJustBoughtForMe: rxMethod<void>(
        pipe(
          map(() => {
            const id = store.selectedFriend();
            return id;
          }),
          filter((id) => id !== null),
          map((id) => store.serverEntityMap()[id]),
          tap((friend) =>
            patchState(
              store,
              removeEntity(friend.id, { collection: 'server' }),
              addEntity(friend, { collection: 'client' }),
              updateEntity(
                { id: friend.id, changes: { boughtLastTime: false } },
                { collection: 'client' },
              ),
            ),
          ),
          mergeMap((friend) =>
            service.markFriendAsYouOwingThem(friend).pipe(
              tapResponse({
                next(value) {
                  patchState(
                    store,
                    removeEntity(friend.id, { collection: 'client' }),
                    addEntity(value, { collection: 'server' }),
                  );
                },
                error: (err) => console.log(err),
                complete() {
                  reduxStore.dispatch(
                    FriendActions.friendBoughtForYou({ friend: friend.name }),
                  );
                },
              }),
            ),
          ),
        ),
      ),

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
