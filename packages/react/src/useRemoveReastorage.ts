import { ReastorageInterface } from "@reastorage/core";

export const useRemoveReastorage = <T, A>(
  storage: ReastorageInterface<T, A>
) => {
  return storage.removeItem;
};
