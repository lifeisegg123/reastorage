import { ReastorageInterface } from "./ReastorageInterface";

export const useSetReastorage = <T>(storage: ReastorageInterface<T>) => {
  return storage.set;
};
