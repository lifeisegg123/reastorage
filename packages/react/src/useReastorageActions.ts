import { ReastorageInterface } from "@reastorage/core";
export const useReastorageActions = <T, A>(
  storage: ReastorageInterface<T, A>
) => {
  return storage.actions;
};
