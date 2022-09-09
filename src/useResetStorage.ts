import { StorageBase } from "./StorageBase";

export const useResetStorage = <T>(storage: StorageBase<T>) => {
  return storage.reset.bind(storage);
};
