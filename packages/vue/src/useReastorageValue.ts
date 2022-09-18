import { computed, onUnmounted, reactive, UnwrapRef } from "vue-demi";
import { ReastorageInterface } from "@reastorage/core";

export const useReastorageValue = <T, A>(
  storage: ReastorageInterface<T, A>
) => {
  let value = reactive({
    value: storage.get(),
  });
  const snapshot = computed(() => value.value);

  const unSubscribe = storage.subscribe((v) => {
    value.value = v as UnwrapRef<T>;
  });

  onUnmounted(() => {
    unSubscribe();
  });

  return snapshot;
};
