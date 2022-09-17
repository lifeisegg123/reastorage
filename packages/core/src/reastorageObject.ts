import { reastorage } from "./reastorage";
import { isUpdaterFn, UpdaterFn } from "./utils";

type AnyRecord = Record<string, any>;

export const reastorageObject = <T extends AnyRecord, A = never>(
  ...args: Parameters<typeof reastorage<T, A>>
) => {
  const storage = reastorage(...args);
  return {
    ...storage,
    append<K extends keyof T>(key: K, value: T[K] | UpdaterFn<T[K]>) {
      return storage.set((prev) => ({
        ...prev,
        [key]: isUpdaterFn(value) ? value(prev[key]) : value,
      }));
    },
    remove<K extends keyof T>(key: K) {
      return storage.set((prev) => {
        const { [key]: _, ...rest } = prev;
        return rest as T;
      });
    },
  };
};

export type ReastorageObject<T extends AnyRecord, A> = ReturnType<
  typeof reastorageObject<T, A>
>;
