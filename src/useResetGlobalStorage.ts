import { GlobalStorage } from "./GlobalStorage";

export const useResetGlobalStorage = <T>(storage: GlobalStorage<T>) => {
  return storage.reset.bind(storage);
};
