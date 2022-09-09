import { useSyncExternalStore } from "use-sync-external-store/shim";
import { StorageBase } from "./StorageBase";

export const useStorage = <T>(storage: StorageBase<T>) => {
  const state = useSyncExternalStore(
    storage.subscribe.bind(storage),
    storage.get.bind(storage),
    storage.getInitialValue.bind(storage)
  );
  return [state, storage.set.bind(storage)] as const;
};
