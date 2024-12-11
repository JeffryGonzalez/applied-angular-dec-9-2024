import {
  signalStoreFeature,
  withState,
  withMethods,
  patchState,
} from '@ngrx/signals';

export function withSelectedFriend() {
  return signalStoreFeature(
    withState<{ selectedFriend: string | null }>({ selectedFriend: null }),
    withMethods((store) => ({
      setSelectedFriend: (selectedFriend: string) =>
        patchState(store, { selectedFriend }),
    })),
  );
}
