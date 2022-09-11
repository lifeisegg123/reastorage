import { DataOrUpdaterFn } from "./utils";

export interface ReastorageInterface<T> {
  get(): T;
  getInitialValue(): T;
  set(dataOrUpdater: DataOrUpdaterFn<T>): void;
  reset(): void;
  subscribe(listen: VoidFunction): VoidFunction;
}
