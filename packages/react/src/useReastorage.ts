import { ReastorageInterface } from "@reastorage/core";
import { useReastorageValue } from "./useReastorageValue";

export const useReastorage = <T, A>(storage: ReastorageInterface<T, A>) => {
  const state = useReastorageValue(storage);
  return [state, storage.set] as const;
};
