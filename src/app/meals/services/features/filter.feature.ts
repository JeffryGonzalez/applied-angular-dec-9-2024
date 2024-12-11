import {
  signalStoreFeature,
  withState,
  withMethods,
  patchState,
} from '@ngrx/signals';

type FilterOptions = 'all' | 'oweYou' | 'youOwe';
type FriendFilterState = {
  filter: FilterOptions;
};
export function withFriendsFilter() {
  return signalStoreFeature(
    withState<FriendFilterState>({ filter: 'all' }),
    withMethods((store) => ({
      setFilter: (filter: FilterOptions) => patchState(store, { filter }),
    })),
  );
}
