import { Reastorage } from "./Reastorage";

export const useResetReastorage = <T>(storage: Reastorage<T>) => {
  return storage.reset.bind(storage);
};
