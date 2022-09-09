import { Reactorage } from "./Reactorage";

export const useSetReactorage = <T>(storage: Reactorage<T>) => {
  return storage.set.bind(storage);
};
