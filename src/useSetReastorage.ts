import { Reastorage } from "./Reastorage";

export const useSetReastorage = <T>(storage: Reastorage<T>) => {
  return storage.set.bind(storage);
};
