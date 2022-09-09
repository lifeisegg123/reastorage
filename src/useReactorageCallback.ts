import { DependencyList, useCallback } from "react";
import { Reactorage } from "./Reactorage";

interface UseStorageCallbackParams {
  get<T>(storage: Reactorage<T>): T;
  set<T>(storage: Reactorage<T>, data: T): void;
}

export const useReactorageCallback = (
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
