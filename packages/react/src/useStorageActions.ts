import { ReastorageInterface } from "@reastorage/core";
export const useStorageActions = <T, A>(storage: ReastorageInterface<T, A>) => {
  return storage.actions;
};
