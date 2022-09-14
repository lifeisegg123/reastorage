import { ReastorageInterface } from "@reastorage/core";

export const useSetReastorage = <T>(storage: ReastorageInterface<T>) => {
  return storage.set;
};
