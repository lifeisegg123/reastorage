import { ReastorageMachine } from "@reastorage/core";
import { computed, onUnmounted, reactive, UnwrapRef } from "vue-demi";

export const useReastorageMachine = <T, A, M>(
  storage: ReastorageMachine<T, A, M>
) => {
  let value = reactive({
    value: storage.getMachineState(),
  });
  const snapshot = computed(() => value.value);

  const unSubscribe = storage.subscribeMachineState((v) => {
    value.value = v as UnwrapRef<keyof M>;
  });

  onUnmounted(() => {
    unSubscribe();
  });

  return [snapshot, storage.send] as const;
};
