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

    if (data) {
      this.set({ ...data, [key]: getValue() });
    } else {
      this.set({ [key]: getValue() } as T);
    }
  }

  remove<K extends keyof T>(key: K) {
    const { data } = this;
    if (!data) return;

    const { [key]: _, ...rest } = data;
    this.set(rest as T);
  }
}
