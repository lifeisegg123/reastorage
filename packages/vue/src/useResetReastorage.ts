import { ReastorageInterface } from "@reastorage/core";

export const useResetReastorage = <T, A>(
  storage: ReastorageInterface<T, A>
) => {
  return storage.reset;
};
