import { DataOrUpdaterFn } from "./utils";
import { isUpdaterFn } from "./utils";

export class StorageBase<T> {
  public listeners = new Set<VoidFunction>();

  private getInitial = false;

  protected data: T;

  constructor(
    private readonly key: string,
    private readonly initialValue: T,
    private readonly storage: "local" | "session" = "local"
  ) {
    this.storage = storage;
    this.key = key;
    this.initialValue = initialValue;
    this.data = initialValue;
  }

  get() {
    if (!this.getInitial) {
      this.getInitial = true;
      const targetValue = window[`${this.storage}Storage`].getItem(this.key);
      if (!targetValue) {
        window[`${this.storage}Storage`].setItem(
          this.key,
          JSON.stringify(this.initialValue)
        );
      } else {
        this.data = JSON.parse(targetValue);
      }
    }
    return this.data;
  }

  getInitialValue(): T {
    return this.initialValue;
  }

  set(dataOrUpdater: DataOrUpdaterFn<T>) {
    const value = isUpdaterFn(dataOrUpdater)
      ? dataOrUpdater(this.data)
      : dataOrUpdater;

    window[`${this.storage}Storage`].setItem(this.key, JSON.stringify(value));
    this.data = value;
    this.listeners.forEach((cb) => cb());
  }

  reset() {
    this.set(this.initialValue);
  }

  subscribe(listen: VoidFunction) {
    this.listeners.add(listen);
    return () => this.listeners.delete(listen);
  }
}
