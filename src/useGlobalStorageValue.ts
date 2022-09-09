import { useSyncExternalStore } from "use-sync-external-store/shim";
import { GlobalStorage } from "./GlobalStorage";

export const useGlobalStorageValue = <T>(storage: GlobalStorage<T>) => {
  return useSyncExternalStore(
    storage.subscribe.bind(storage),
    storage.get.bind(storage),
    storage.getInitialValue.bind(storage)
  );
};
