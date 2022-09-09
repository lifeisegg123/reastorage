import { useSyncExternalStore } from "use-sync-external-store/shim";
import { Reactorage } from "./Reactorage";

export const useReactorageValue = <T>(storage: Reactorage<T>) => {
  return useSyncExternalStore(
    storage.subscribe.bind(storage),
    storage.get.bind(storage),
    storage.getInitialValue.bind(storage)
  );
};
