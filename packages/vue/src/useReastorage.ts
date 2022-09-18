import { computed, onUnmounted, reactive, UnwrapRef } from "vue-demi";
import { ReastorageInterface } from "@reastorage/core";
import { useReastorageValue } from "./useReastorageValue";

export const useReastorage = <T, A>(storage: ReastorageInterface<T, A>) => {
  const value = useReastorageValue(storage);

  return [value, storage.set] as const;
};
