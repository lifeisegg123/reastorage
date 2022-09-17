import { DependencyList, useCallback } from "react";
import { ReastorageInterface, DataOrUpdaterFn } from "@reastorage/core";
import { ActionCreator } from "@reastorage/core/dist/ReastorageInterface";

interface UseStorageCallbackParams {
  get<T, A>(storage: ReastorageInterface<T, A>): T;
  set<T, A>(storage: ReastorageInterface<T, A>, data: DataOrUpdaterFn<T>): void;
  actions<T, A>(
    storage: ReastorageInterface<T, A>
  ): ReturnType<ActionCreator<T, A>>;
}

export const useReastorageCallback = (
  callback: (params: UseStorageCallbackParams) => void,
  deps: DependencyList = []
) => {
  return useCallback(() => {
    callback({
      get: (storage) => storage.get(),
      set: (storage, data) => storage.set(data),
      actions: (storage) => storage.actions,
    });
  }, [...deps]);
};
