import { DependencyList, useCallback } from "react";
import { Reastorage } from "./Reastorage";

interface UseStorageCallbackParams {
  get<T>(storage: Reastorage<T>): T;
  set<T>(storage: Reastorage<T>, data: T): void;
}

export const useReastorageCallback = (
  callback: (params: UseStorageCallbackParams) => void,
  deps: DependencyList = []
) => {
  return useCallback(() => {
    callback({
      get: (storage) => storage.get(),
      set: (storage, data) => storage.set(data),
    });
  }, [...deps]);
};
