import { useSyncExternalStore } from "use-sync-external-store/shim/index.js";
import { ReastorageInterface } from "@reastorage/core";

export const useReastorageValue = <T>(storage: ReastorageInterface<T>) => {
  return useSyncExternalStore(
    storage.subscribe,
    storage.get,
    storage.getInitialValue
  );
};
