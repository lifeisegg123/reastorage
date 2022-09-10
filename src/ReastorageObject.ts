import { Reastorage } from "./Reastorage";
import { isUpdaterFn, UpdaterFn } from "./utils";

type AnyRecord = { [key: string]: any };

export class ReastorageObject<T extends AnyRecord> extends Reastorage<T> {
  append<K extends keyof T>(key: K, value: T[K] | UpdaterFn<T[K]>) {
    const { data } = this;
    const getValue = () => {
      if (isUpdaterFn(value)) return value(data[key]);
      return value;
    };

    this.set({ ...data, [key]: getValue() });
  }

  remove<K extends keyof T>(key: K) {
    const { data } = this;

    const { [key]: _, ...rest } = data;
    this.set(rest as T);
  }
}
