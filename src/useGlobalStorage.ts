import { useSyncExternalStore } from "use-sync-external-store/shim";
import { GlobalStorage } from "./GlobalStorage";

export const useGlobalStorage = <T>(storage: GlobalStorage<T>) => {
  const state = useSyncExternalStore(
    storage.subscribe.bind(storage),
    storage.get.bind(storage),
    storage.getInitialValue.bind(storage)
  );
  return [state, storage.set.bind(storage)] as const;
};
