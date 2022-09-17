import { ReastorageInterface } from "@reastorage/core";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector.js";

export const useReastorageSelector = <T, A, R>(
  storage: ReastorageInterface<T, A>,
  selectFn: (state: T) => R,
  isEqualFn?: (a: R, b: R) => boolean
) => {
  return useSyncExternalStoreWithSelector(
    storage.subscribe,
    storage.get,
    storage.getInitialValue,
    selectFn,
    isEqualFn
  );
};
