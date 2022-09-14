import { ReastorageInterface } from "@reastorage/core";

export const useResetReastorage = <T>(storage: ReastorageInterface<T>) => {
  return storage.reset;
};
