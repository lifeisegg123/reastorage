export type UpdaterFn<T> = (prev: T) => T;
export type DataOrUpdaterFn<T> = T | UpdaterFn<T>;

export const isUpdaterFn = <T>(
  value: DataOrUpdaterFn<T>
): value is UpdaterFn<T> => typeof value === "function";
