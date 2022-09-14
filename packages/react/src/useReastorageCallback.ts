import { DependencyList, useCallback } from "react";
import { ReastorageInterface, DataOrUpdaterFn } from "@reastorage/core";

interface UseStorageCallbackParams {
  get<T>(storage: ReastorageInterface<T>): T;
  set<T>(storage: ReastorageInterface<T>, data: DataOrUpdaterFn<T>): void;
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
