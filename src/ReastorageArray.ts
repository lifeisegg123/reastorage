import { Reastorage } from "./Reastorage";

type InferArray<T> = T extends Array<infer U> ? U : never;

function isArray<T>(value: unknown): value is Array<T> {
  return Array.isArray(value);
}

type RemoveValOrFn<T> = ((v: InferArray<T>) => boolean) | InferArray<T>;

export class ReastorageArray<T extends Array<any>> extends Reastorage<T> {
  append(value: InferArray<T>) {
    const { data } = this;

    if (!isArray(data)) throw new Error("typeof value is not an array");
    this.set([...data, value] as T);
  }

  remove(valOrFn: RemoveValOrFn<T>) {
    const { data } = this;

    const value =
      typeof valOrFn === "function"
        ? data.filter(valOrFn)
        : data.filter((v) => v !== valOrFn);

    this.set(value as T);
  }
}
