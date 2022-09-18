import { ReastorageInterface } from "@reastorage/core";

export const useSetReastorage = <T, A>(storage: ReastorageInterface<T, A>) => {
  return storage.set;
};
