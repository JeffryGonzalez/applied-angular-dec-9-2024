import { inject } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
} from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Store } from '@ngrx/store';
import { setFulfilled, setPending, withRequestStatus } from '@shared';
import { pipe, switchMap, tap } from 'rxjs';
import { FriendActions } from '../../../shared/state/reducers/actions';
import { Friend } from '../../types';
import { FriendsDataService } from '../friends-data.service';

export function withServerFriendData() {
  return signalStoreFeature(
    withRequestStatus(),
    withEntities({ collection: 'server', entity: type<Friend>() }),
    withMethods((store) => {
      const service = inject(FriendsDataService);
      return {};
    }),
  );
}
