import { useSyncExternalStore } from "use-sync-external-store/shim";
import { ReastorageInterface } from "./ReastorageInterface";

export const useReastorageValue = <T>(storage: ReastorageInterface<T>) => {
  return useSyncExternalStore(
    storage.subscribe,
    storage.get,
    storage.getInitialValue
  );
};
