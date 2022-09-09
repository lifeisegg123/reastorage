import { Reactorage } from "./Reactorage";

export const useResetReactorage = <T>(storage: Reactorage<T>) => {
  return storage.reset.bind(storage);
};
