import { DependencyList, useCallback } from "react";
import { GlobalStorage } from "./GlobalStorage";

interface UseStorageCallbackParams {
  get<T>(storage: GlobalStorage<T>): T;
  set<T>(storage: GlobalStorage<T>, data: T): void;
}

export const useGlobalStorageCallback = (
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
