import {
  signalStoreFeature,
  withState,
  withMethods,
  patchState,
  withHooks,
  watchState,
} from '@ngrx/signals';

export function withSavedFormData() {
  return signalStoreFeature(
    withState({ savedName: '' }),
    withMethods((store) => ({
      setSavedName: (name: string) => patchState(store, { savedName: name }),
    })),
    withHooks({
      onInit(store) {
        const savedTempName = localStorage.getItem('tempname');
        if (savedTempName !== null) {
          patchState(store, { savedName: savedTempName });
        }
        watchState(store, (state) => {
          localStorage.setItem('tempname', state.savedName);
        });
      },
    }),
  );
}
