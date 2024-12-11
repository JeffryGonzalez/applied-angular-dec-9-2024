import { inject } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
} from '@ngrx/signals';
import { addEntities, setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { setFulfilled, setPending, withRequestStatus } from '@shared';
import { pipe, switchMap, tap } from 'rxjs';
import { Friend } from '../../types';
import { FriendsDataService } from '../friends-data.service';

export function withServerFriendData() {
  return signalStoreFeature(
    withRequestStatus(),
    withEntities({ collection: 'server', entity: type<Friend>() }),
    withMethods((store) => {
      const service = inject(FriendsDataService);
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
                    ),
                  ),
                ),
            ),
          ),
        ),
      };
    }),
  );
}
