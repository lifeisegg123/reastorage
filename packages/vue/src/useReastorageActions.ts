import { ReastorageInterface, ReastoreageActions } from "@reastorage/core";

export const useReastorageActions = <T, A extends ReastoreageActions<T>>(
  storage: ReastorageInterface<T, A>
) => {
  if (!storage.actions)
    throw new Error(`[Reastorage] storage ${storage.key} has no actions`);
  return storage.actions;
};
