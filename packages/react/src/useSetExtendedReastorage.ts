import { ReastorageArray, ReastorageObject } from "@reastorage/core";

type AnyRecord = Record<string, any>;

type Append<
  T extends ReastorageArray<Array<any>, any> | ReastorageObject<AnyRecord, any>
> = T extends
  | ReastorageArray<Array<any>, any>
  | ReastorageObject<AnyRecord, any>
  ? T["append"]
  : never;

type Remove<
  T extends ReastorageArray<Array<any>, any> | ReastorageObject<AnyRecord, any>
> = T extends
  | ReastorageArray<Array<any>, any>
  | ReastorageObject<AnyRecord, any>
  ? T["remove"]
  : never;

export const useSetExtendedReastorage = <
  T extends ReastorageArray<Array<any>, any> | ReastorageObject<AnyRecord, any>
>(
  storage: T
) => {
  return {
    append: storage.append as Append<T>,
    remove: storage.remove as Remove<T>,
  };
};
