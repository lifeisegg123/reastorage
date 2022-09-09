import { DependencyList, useCallback } from "react";
import { StorageBase } from "./StorageBase";

interface UseStorageCallbackParams {
  get<T>(storage: StorageBase<T>): T;
  set<T>(storage: StorageBase<T>, data: T): void;
}

export const useStorageCallback = <T>(
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
