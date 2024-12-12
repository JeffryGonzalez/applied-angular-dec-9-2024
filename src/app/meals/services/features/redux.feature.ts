import { effect, inject } from '@angular/core';
import {
  signalStoreFeature,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Store } from '@ngrx/store';
import { FriendActions } from '../../../shared/state/reducers/actions';

type ReduxStoreState = {
  count: number;
};
export function withReduxStore() {
  return signalStoreFeature(
    withState<ReduxStoreState>({ count: 0 }),
    withMethods(() => {
      const reduxStore = inject(Store);
      return {
        _countDispatch: (count: number) =>
          reduxStore.dispatch(FriendActions.friendCountChanged({ count })),
      };
    }),

    withHooks({
      onInit(store) {
        effect(() => {
          store._countDispatch(store.count());
          console.log('Got One');
        });
      },
    }),
  );
}

export function setCount(count: number): ReduxStoreState {
  return { count };
}
