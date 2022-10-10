import { DependencyList, useCallback } from "react";
import { ReastorageInterface, DataOrUpdaterFn } from "@reastorage/core";
import {
  ActionCreator,
  ReastoreageActions,
} from "@reastorage/core/dist/ReastorageInterface";

interface UseStorageCallbackParams {
  get<T, A>(storage: ReastorageInterface<T, A>): T;
  set<T, A>(storage: ReastorageInterface<T, A>, data: DataOrUpdaterFn<T>): void;
  actions<T, A extends ReastoreageActions<T>>(
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
      actions: (storage) => {
        if (!storage.actions)
          throw new Error(`[Reastorage] storage ${storage.key} has no actions`);
        return storage.actions;
      },
    });
  }, [...deps]);
};
