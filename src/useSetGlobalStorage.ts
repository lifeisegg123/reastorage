import { GlobalStorage } from "./GlobalStorage";

export const useSetGlobalStorage = <T>(storage: GlobalStorage<T>) => {
  return storage.set.bind(storage);
};
