import { signalStoreFeature, type } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { withRequestStatus } from '@shared';
import { Friend } from '../../types';

export function withServerFriendData() {
  return signalStoreFeature(
    withRequestStatus(),
    withEntities({ collection: 'server', entity: type<Friend>() }),
  );
}
