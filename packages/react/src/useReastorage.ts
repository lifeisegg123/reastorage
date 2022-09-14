import { ReastorageInterface } from "@reastorage/core";
import { useReastorageValue } from "./useReastorageValue";

export const useReastorage = <T>(storage: ReastorageInterface<T>) => {
  const state = useReastorageValue(storage);
  return [state, storage.set] as const;
};
