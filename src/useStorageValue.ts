import { useSyncExternalStore } from "use-sync-external-store/shim";
import { StorageBase } from "./StorageBase";

export const useStorageValue = <T>(storage: StorageBase<T>) => {
  return useSyncExternalStore(
    storage.subscribe.bind(storage),
    storage.get.bind(storage),
    storage.getInitialValue.bind(storage)
  );
};
