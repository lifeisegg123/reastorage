import { Reastorage } from "./Reastorage";

type InferArray<T> = T extends Array<infer U> ? U : never;

function isArray<T>(value: unknown): value is Array<T> {
  return Array.isArray(value);
}

export class ReastorageArray<T extends Array<any>> extends Reastorage<T> {
  append(value: InferArray<T>) {
    const { data } = this;

    if (data) {
      if (!isArray(data)) throw new Error("typeof value is not an array");
      this.set([...data, value] as T);
    } else {
      this.set([value] as T);
    }
  }

  remove(func: (v: InferArray<T>) => boolean) {
    const { data } = this;

    if (!data) return;

    this.set(data.filter(func) as T);
  }
}
