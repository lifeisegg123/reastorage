import { useSyncExternalStore } from "use-sync-external-store/shim";
import { Reactorage } from "./Reactorage";

export const useReactorage = <T>(storage: Reactorage<T>) => {
  const state = useSyncExternalStore(
    storage.subscribe.bind(storage),
    storage.get.bind(storage),
    storage.getInitialValue.bind(storage)
  );
  return [state, storage.set.bind(storage)] as const;
};
