import { reastorage } from "./reastorage";

type InferArray<T> = T extends Array<infer U> ? U : never;

type RemoveValOrFn<T> = ((v: InferArray<T>) => boolean) | InferArray<T>;

export const reastorageArray = <T extends Array<any>, A>(
  ...args: Parameters<typeof reastorage<T, A>>
) => {
  const storage = reastorage(...args);
  return {
    ...storage,
    append(value: InferArray<T>) {
      return storage.set((prev) => [...prev, value] as T);
    },
    remove(valOrFn: RemoveValOrFn<T>) {
      return storage.set(
        (prev) =>
          (typeof valOrFn === "function"
            ? prev.filter(valOrFn)
            : prev.filter((v) => v !== valOrFn)) as T
      );
    },
  };
};

export type ReastorageArray<T extends Array<any>, A> = ReturnType<
  typeof reastorageArray<T, A>
>;
