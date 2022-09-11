import { useSyncExternalStore } from "use-sync-external-store/shim/index.js";
import { ReastorageInterface } from "./ReastorageInterface";

export const useReastorage = <T>(storage: ReastorageInterface<T>) => {
  const state = useSyncExternalStore(
    storage.subscribe,
    storage.get,
    storage.getInitialValue
  );
  return [state, storage.set] as const;
};
