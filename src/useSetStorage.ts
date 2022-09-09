import { StorageBase } from "./StorageBase";

export const useSetStorage = <T>(storage: StorageBase<T>) => {
  return storage.set.bind(storage);
};
