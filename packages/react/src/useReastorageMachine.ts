import { ReastorageMachine } from "@reastorage/core";
import { useSyncExternalStore } from "use-sync-external-store/shim/index.js";

export const useReastorageMachine = <T, A, M>(
  storage: ReastorageMachine<T, A, M>
) => {
  if (!storage.getMachineState())
    throw new Error(`[Reastorage] storage ${storage.key} has no machine`);

  return [
    useSyncExternalStore(
      storage.subscribeMachineState,
      storage.getMachineState,
      storage.getMachineState
    ),
    storage.send,
  ] as const;
};
