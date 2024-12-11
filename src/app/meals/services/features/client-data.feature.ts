import { inject } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
} from '@ngrx/signals';
import { addEntity, withEntities } from '@ngrx/signals/entities';
import { Friend } from '../../types';
import { FriendsDataService } from '../friends-data.service';

export function withClientFriendData() {
  return signalStoreFeature(
    withEntities({ collection: 'client', entity: type<Friend>() }),
    withMethods((store) => {
      return {
        _addTempFriend: (name: string, tempId: string) => {
          const tempFriend: Friend = {
            id: tempId,
            name,
            boughtLastTime: false,
          };

          patchState(store, addEntity(tempFriend, { collection: 'client' }));
        },
      };
    }),
  );
}
