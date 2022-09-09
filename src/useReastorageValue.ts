import { useSyncExternalStore } from "use-sync-external-store/shim";
import { Reastorage } from "./Reastorage";

export const useReastorageValue = <T>(storage: Reastorage<T>) => {
  return useSyncExternalStore(
    storage.subscribe.bind(storage),
    storage.get.bind(storage),
    storage.getInitialValue.bind(storage)
  );
};
