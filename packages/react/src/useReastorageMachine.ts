import { ReastorageMachine } from "@reastorage/core";
import { useSyncExternalStore } from "use-sync-external-store/shim/index.js";

export const useReastorageMachine = <T, A, M>(
  storage: ReastorageMachine<T, A, M>
) => {
  return [
    useSyncExternalStore(
      storage.subscribeMachineState,
      storage.getMachineState,
      storage.getMachineState
    ),
    storage.send,
  ] as const;
};
