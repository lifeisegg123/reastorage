import { useSyncExternalStore } from "use-sync-external-store/shim";
import { Reastorage } from "./Reastorage";

export const useReastorage = <T>(storage: Reastorage<T>) => {
  const state = useSyncExternalStore(
    storage.subscribe.bind(storage),
    storage.get.bind(storage),
    storage.getInitialValue.bind(storage)
  );
  return [state, storage.set.bind(storage)] as const;
};
