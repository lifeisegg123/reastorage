import { ReastorageInterface } from "./reastorage";

export type ExtractStorageValue<T> = T extends ReastorageInterface<infer V, any>
  ? V
  : never;

export type ExtractStorageActions<T> = T extends ReastorageInterface<
  any,
  infer Actions
>
  ? Actions
  : never;
