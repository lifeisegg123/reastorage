import { DataOrUpdaterFn } from "../utils/isUpdaterFn";
import { ActionCreator } from "./actions";

export interface ReastorageInterface<T, A> {
  get(): T;
  getInitialValue(): T;
  set(dataOrUpdater: DataOrUpdaterFn<T>): void;
  reset(): void;
  subscribe(listen: (value: T) => void): VoidFunction;
  actions: ReturnType<ActionCreator<T, A>>;
  key: string;
}

export type Compress = "default" | "utf-16" | false;

export type Serializer<T> = {
  serialize: (value: T) => string;
  deserialize: (value:string) => T;
}

export interface Options<T, A> {
  storage?: "local" | "session";
  compress?: Compress;
  actions?: ActionCreator<T, A>;
  serializer?: Serializer<T>
}
