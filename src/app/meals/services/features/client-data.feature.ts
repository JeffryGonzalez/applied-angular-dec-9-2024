import { signalStoreFeature, type } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { Friend } from '../../types';

export function withClienttFriendData() {
  return signalStoreFeature(
    withEntities({ collection: 'client', entity: type<Friend>() }),
  );
}
