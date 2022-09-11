import { ReastorageInterface } from "./ReastorageInterface";

export const useResetReastorage = <T>(storage: ReastorageInterface<T>) => {
  return storage.reset;
};
